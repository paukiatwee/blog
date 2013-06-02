---
layout: post
title: Java JEE7 JPA 2.1 Stored Procedure Example
description: JEE 7 JPA 2.1 now support stored procedure natively. See how easy to use stored procedure in by example.
categories:
- java
tags:
- jee7
- jpa
- stored-procedure
---


JEE 7, the next release of Java Enterprice for large application will include a new enchanced JPA 2.1. JPA 2.1 now have native support for stored procedure. Folllow this blog post to know how to use soted procedure in JPA 2.1.

<!--more-->

Let get started how to use JPA 2.1 to execute stored procedure.

### Dependencies

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
    <!-- jdbc driver for Postgresql -->
    <dependency>
        <groupId>postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>9.1-901.jdbc4</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
~~~

The JPA 2.1 implementation that I use is Eclipselink, which is Reference Implementation for JPA 2.1.
Note the database that I use is Postgresql, you can use appropiate JDBC driver for your database. 


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
    <properties>
      <property name="javax.persistence.jdbc.driver" value="org.postgresql.Driver"/>
      <property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost:5432/dreamandme"/>
      <property name="javax.persistence.jdbc.user" value="postgres"/>
      <property name="javax.persistence.jdbc.password" value="password"/>
      <property name="eclipselink.ddl-generation" value="create-tables"/>
    </properties>
  </persistence-unit>
</persistence>

~~~

### Create Stored Procedure For Postgresql

In this example, I use Postgresql as database. The follows is the stored procedured that I created for this tutorial:

~~~
CREATE FUNCTION sales_tax(subtotal float, OUT tax float) AS $$
BEGIN
    tax := subtotal * 0.06;
END;
$$ LANGUAGE plpgsql;
~~~

This stored procedure simple take `subtotal` as `IN` then `tax` as `OUT`.

### Java JPA 2.1 Stored Procedure Call

The next step is going to the main purpose of the example, call stored procedure in Java JEE7 JPA 2.1, the following is the example code:

~~~
package me.dreamand.jee7.jpa21;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;

public class App {

    private static final String PERSISTENCE_UNIT_NAME = "transactions-optional";
    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();

        // Create call stored procedure
        em.getTransaction().begin();
        StoredProcedureQuery storedProcedure = em.createStoredProcedureQuery("sales_tax");
        // set parameters
        storedProcedure.registerStoredProcedureParameter("subtotal", Double.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("tax", Double.class, ParameterMode.OUT);
        storedProcedure.setParameter("subtotal", 1f);
        // execute SP
        storedProcedure.execute();
        // get result
        Double tax = (Double)storedProcedure.getOutputParameterValue("tax");
        System.out.println("Tax is: " + tax);
        em.getTransaction().commit();
        em.close();
    }
}

~~~

Run the `main` method, the console will output the following text:

~~~
Tax is: 0.06
~~~


### Conclusion

With the new Java JEE7 JPA 2.1 release bring stored procedure support to the next level without using JDBC low level API. This bring JEE7 to the next most awaited release of JEE.
