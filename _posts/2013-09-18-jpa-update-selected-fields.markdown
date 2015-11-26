---
layout: post
title: JPA 2.1 Update Criteria That Support Bulk/Partial Update
description: Learn how to use JPA 2.1 to perform partial update to Entity bean.
categories:
- java
tags:
- jpa-2
- hibernate
---

JEE 7, the latest relase of JEE now is available with JPA 2.1. JPA 2.1 new features include Store Procedure support, and bulk update via `CriteriaUpdate`.

In this post I will describe how to get started with JPA 2.1's `CriteriaUpdate` to perform bulk update or partial(single field) entity update.


<!--more-->

### JPA 2.1 Maven Dependencies

I use maven to manage dependencies, the following `pom.xml` show the dependencies that I used:

~~~
<dependencies>
    <dependency>
        <groupId>org.eclipse.persistence</groupId>
        <artifactId>javax.persistence</artifactId>
        <version>2.1.0</version>
    </dependency>
    <dependency>
        <groupId>org.eclipse.persistence</groupId>
        <artifactId>org.eclipse.persistence.jpa</artifactId>
        <version>2.5.0</version>
    </dependency>
    <!-- jdbc driver for Hsqldb -->
    <dependency>
      	<groupId>org.hsqldb</groupId>
      	<artifactId>hsqldb</artifactId>
      	<version>2.3.0</version>
      	<scope>runtime</scope>
    </dependency>
</dependencies>
~~~

The JPA 2.1 implementation that I use is Eclipselink, which is Reference Implementation for JPA 2.1. Note the database that I use is HQSLDB in memory Database, you can use appropiate JDBC driver for your database.

### Setup persistence.xml for JPA 2.1

The `persistence.xml` for JPA 2.1 is similar with that of JPA 2.0, but with the different version of `xsd`. The following shows the persistence.xml that I used for JPA 2.1:

~~~
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence
                                http://java.sun.com/xml/ns/persistence/persistence_2_1.xsd">
  <persistence-unit name="transactions-optional">
    <provider>org.eclipse.persistence.jpa.PersistenceProvider</provider>
    <class>me.dreamand.blog.jpa.User</class>
    <properties>
      <property name="javax.persistence.jdbc.driver" value="org.hsqldb.jdbcDriver"/>
      <property name="javax.persistence.jdbc.url" value="jdbc:hsqldb:mem:dreamandme"/>
      <property name="javax.persistence.jdbc.user" value="sa"/>
      <property name="javax.persistence.jdbc.password" value=""/>
      <property name="eclipselink.logging.level.sql" value="FINE"/>
      <property name="eclipselink.logging.parameters" value="true"/>
      <property name="eclipselink.ddl-generation" value="create-tables"/>
    </properties>
  </persistence-unit>
</persistence>

~~~

### Java JPA 2.1 Bulk/Partial Update

The next step is going to the main purpose of the example, partial update the Entity's field using JPA 2.1, the following is the example code:

~~~
package me.dreamand.blog.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Root;
import java.util.Date;

public class JpaPartialUpdate {

    private static final String PERSISTENCE_UNIT_NAME = "transactions-optional";

    public static void main(String[] args) {

        EntityManagerFactory factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();

        // create user
        em.getTransaction().begin();
        User user = new User();
        user.setUsername("user@example.com");
        user.setPassword("password");
        user.setCreatedAt(new Date());
        em.persist(user);
        em.getTransaction().commit();
        // end create user

        assert user.getId() != 0;

        System.out.println("Before update user Date of Birth: " + user.getDateOfBirth());

        // update user date of birth
        em.getTransaction().begin();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<User> updateCriteria = cb.createCriteriaUpdate(User.class);
        Root<User> root = updateCriteria.from(User.class);
        // update dateOfBirth property
        updateCriteria.set(root.get("dateOfBirth"), new Date());
        // set where clause
        updateCriteria.where(cb.equal(root.get("id"), user.getId()));
        // update
        int affected = em.createQuery(updateCriteria).executeUpdate();
        System.out.println("Affected row: " + affected);
        em.getTransaction().commit();
        // end update user date of birth


        // select user again to verify
        em.getTransaction().begin();
        em.refresh(user);

        System.out.println("After update User Date of Birth: " + user.getDateOfBirth());

        em.getTransaction().commit();
        em.close();
    }
}

~~~


After run the main class, the following shows the output:

~~~
INSERT INTO users (CREATED_AT, DATEOFBIRTH, PASSWORD, USERNAME) VALUES (?, ?, ?, ?)
	bind => [2013-09-18 10:26:08.43, null, password, user@example.com]

Before update user Date of Birth: null

UPDATE users SET DATEOFBIRTH = ? WHERE (ID = ?)
	bind => [2013-09-18, 1]

Affected row: 1

SELECT ID, CREATED_AT, DATEOFBIRTH, PASSWORD, USERNAME FROM users WHERE (ID = ?)
	bind => [1]
After update User Date of Birth: Wed Sep 18 00:00:00 EDT 2013
~~~

In the example code, I make update to the user by using `id`, you can easily use other condition that allow bulk update to the data.


### Conclusion

With JPA 2.1, now the API is support bulk/partial update while previously the partial update must select the enitity from table and update the fields then save back to database. Which will cause performance issue and maintenance issue as well.
