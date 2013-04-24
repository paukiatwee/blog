---
layout: post
title: JEE7 JSON API Example
description: JEE 7 now support JSON convertion via standard api. This tutorial will show how to use the new JSON API.
categories:
- java
tags:
- jee7
- json
- jrs
---


JEE 7, the next release of Java Enterprice for large application will include a standard JSON API without using third party JSON API such as [JSON.org][jsobn-org]. Is time to use standard API for Java web development.

<!--more-->


### Setup

I use [maven][maven] for managing dependencies and the RI for JSON API is from [glassfish][glassfish]. You can download the jars into your project as well from [json-api][json-api] and [json-ri][json-ri] from maven site if you not using maven to manage dependency. The example `pom.xml` is as below:

~~~
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>me.dreamand</groupId>
  <artifactId>json</artifactId>
  <version>1.0.0-SNAPSHOT</version>

  <build>
    <plugins>
      <plugin>
        <groupId>org.mortbay.jetty</groupId>
        <artifactId>jetty-maven-plugin</artifactId>
        <version>8.1.9.v20130131</version>
      </plugin>
    </plugins>
  </build>
  <dependencies>
    <dependency>
      <groupId>javax.json</groupId>
      <artifactId>javax.json-api</artifactId>
      <version>1.0-b06</version>
    </dependency>
    <dependency>
      <groupId>org.glassfish</groupId>
      <artifactId>javax.json</artifactId>
      <version>1.0-b06</version>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.0.1</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
</project>
~~~


### JEE 7 JSON API Example

Then the next step is start to use JEE7 JSON API

~~~
// import
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JsonExample {

    public static void main(String[] args) {

        List<User> users = getUsers();

        // build JSON
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for(User user: users) {
            jsonArrayBuilder.add(
                    Json.createObjectBuilder()
                            .add("id", user.getId())
                            .add("name", user.getName())
                            .add("join", user.getJoin().getTime())
            );
        }

        JsonArray usersJson = jsonArrayBuilder.build();

        System.out.println(usersJson.toString());

    }

    // dummy users
    public static List<User> getUsers() {
        List<User> users = new ArrayList<User>(10);
        User user = new User();
        user.setId(1);
        user.setName("Hero");
        user.setJoin(new Date());
        users.add(user);

        user = new User();
        user.setId(2);
        user.setName("Citizen");
        user.setJoin(new Date());
        users.add(user);

        return users;
    }

    // POJO
    public static class User implements Serializable {
        private long id;
        private String name;
        private Date join;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Date getJoin() {
            return join;
        }

        public void setJoin(Date join) {
            this.join = join;
        }
    }
}
~~~

Output of the program:

~~~

[{"id":1,"name":"Hero","join":1366808892498},{"id":2,"name":"Citizen","join":1366808892498}]

~~~

[json-org]: http://json.org/java/
[maven]: http://maven.apache.org/
[json-api]: http://repo1.maven.org/maven2/javax/json/javax.json-api/
[json-ri]: http://repo1.maven.org/maven2/org/glassfish/javax.json/
[glassfish]: http://glassfish.java.net/