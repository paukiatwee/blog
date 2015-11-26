---
layout: post
title: Deploy Springframeworka and JPA 2 Quickstart to Cloud Foundry in Minutes
description: Learn how to quicky start development and deploy Java Springframework and JPA 2 web application to Cloud Foundry.
categories:
- java
tags:
- springframework
- cloudfoundry
- jpa-2
- hibernate
---


Get started with complex Java [Spring Framework][spring] and JPA 2 ([Hibernate][hibernate]) is slow and time consuming. While Ruby On Rails provide tool to generate project in seconds to quickly start a new Rails application, why not build a Java quick start template that alrady configured all necessary configurations? Getting started with Java web development is tedious and time consuming is not execuse anymore. I will describe how to get started with Java web development in minutes and deploy to [Cloud Foundry][cf].


<!--more-->

### Prerequisite

* [Cloud Foundry][cf] Account
* `cf` CLI installed
* `maven` installed
* `git` installed

### Clone Project

I created [webapp-bootstrap][Webapp-Bootstrap] using [Spring Framework][spring], JPA 2 ([Hibernate][hibernate]) and [Twitter Bootstrap][tb] template and available on Github. You can clone into your machine to get started:

~~~
git clone https://github.com/paukiatwee/webapp-bootstrap.git
~~~

### Start Local Web Server

The template I created already configured a jetty server to developers can quickly start development straight aways instead of need to setup tomcat/jboss locally. To start the embadded jetty server, just run the followings command:

~~~
cd webapp-bootstrap
sh run.sh # or run.bat on Windows
~~~

I writed a shell/bat script that start embadded jetty server, underlaying it is executing:

~~~
mvn clean compile jetty:run
~~~

just to save few keystrokes. :)

Wait the maven download all nessasery jars then you can browse to [http://localhost:8080](http://localhost:8080) to view the app. Easy and fast!

![Webapp Bootstrap](/img/posts/webapp-bootstrap.png "Webapp Bootstrap")

### Packaging War

Before deploy to Cloud Foundry, you will need to package Java web application as a war file. Packaging war file using maven is easy:

~~~
mvn clean package
~~~

After the command is completed, the war file is generated into `target` folder. Now you can start deploy to Cloud Foundry!

### Deploy to Cloud Foundry

Before you deploy to Cloud Foundry, you must login using `cf` tool:

~~~
cd target
cf login
target: https://api.run.pivotal.io

Email> you@example.com

Password> ***********

Authenticating... OK
~~~

After autheticated, you can deploy webapp-bootstrap to Cloud Foundry

~~~
cf push webapp-bootstrap
Instances> 1

1: 128M
2: 256M
3: 512M
4: 1G
Memory Limit> 4   

Creating webapp-bootstrap... OK

1: webapp-bootstrap
2: none
Subdomain> webapp-bootstrap

1: cfapps.io
2: none
Domain> cfapps.io

Creating route webapp-bootstrap.cfapps.io... OK
Binding webapp-bootstrap.cfapps.io to webapp-bootstrap... OK

Create services for application?> n

Bind other services to application?> n

Save configuration?> n

Uploading webapp-bootstrap... OK
Starting webapp-bootstrap... OK
-----> Downloaded app package (24M)
Downloading JDK...
Copying openjdk-1.7.0_25.tar.gz from the buildpack cache ...
Unpacking JDK to .jdk
Downloading Tomcat: apache-tomcat-7.0.41.tar.gz
Copying apache-tomcat-7.0.41.tar.gz from the buildpack cache ...
Unpacking Tomcat to .tomcat
Copying mysql-connector-java-5.1.12.jar from the buildpack cache ...
Copying postgresql-9.0-801.jdbc4.jar from the buildpack cache ...
Downloading auto-reconfiguration-0.7.1.jar from https://s3.amazonaws.com/maven.springframework.org/milestone/org/cloudfoundry/auto-reconfiguration/0.7.1 ...
-----> Downloaded app package (24M)
Downloading JDK...
Copying openjdk-1.7.0_25.tar.gz from the buildpack cache ...
Unpacking JDK to .jdk
Downloading Tomcat: apache-tomcat-7.0.41.tar.gz
Copying apache-tomcat-7.0.41.tar.gz from the buildpack cache ...
Unpacking Tomcat to .tomcat
Copying mysql-connector-java-5.1.12.jar from the buildpack cache ...
Copying postgresql-9.0-801.jdbc4.jar from the buildpack cache ...
Downloading auto-reconfiguration-0.7.1.jar from https://s3.amazonaws.com/maven.springframework.org/milestone/org/cloudfoundry/auto-reconfiguration/0.7.1 ...
-----> Uploading droplet (62M)
Checking status of app 'webapp-bootstrap'....
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  1 of 1 instances running (1 running)
Push successful! App 'webapp-bootstrap' available at http://webapp-bootstrap.cfapps.io
~~~

After push successfuly, browse to [http://YOUR_APP.cfapps.io](http://YOUR_APP.cfapps.io) to view the deployed app.

### Conclusion

In this post, I deplyo an Java web app to [Cloud Foundry][cf] in minutes without writing any code. That is how easy to deploy Java application to the cloud if you prepare the template to production and developer friendly! Any question can tweet/follow me [@paukiatwee](https://twitter.com/paukiatwee).

[spring]: http://www.springsource.org
[hibernate]: http://www.hibernate.org
[tb]: http://getbootstrap.com
[cf]: http:://cloudfoundry.com
[webapp-bootstrap]: https://github.com/paukiatwee/webapp-bootstrap
[localhost]: http://localhost:8080
