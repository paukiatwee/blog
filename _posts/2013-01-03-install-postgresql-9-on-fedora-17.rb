---
layout: post
title: How to Install Postgresql 9.1 on Fedora 17
description: How to install PostgreSQL 9.1 on Fedora 17, and configure service then create user and database.
keywords: fedora 17, fedora, install postgresql, install postgres, postgres 9.1, postgresql 9.1
categories:
- administration
tags:
- installation
- fedora 17
- postgresql-9
---

PostgreSQL is a powerful, open source object-relational database system. It is fully ACID compliant, has full support for foreign keys, joins, views, triggers, and stored procedures (in multiple languages). It includes most SQL:2008 data types, including INTEGER, NUMERIC, BOOLEAN, CHAR, VARCHAR, DATE, INTERVAL, and TIMESTAMP.

In this post, I will describe how to install PostgreSQL 9.1 server on Fedora 17. So let's get started.

<!--more-->

### Install PostgreSQL 9.1 and Initialize Database

~~~
sudo yum install postgresql-server
sudo postgresql-setup initdb
~~~

### Enable PostgreSQL Service and Start PostgreSQL
If you wish to start PostgreSQL as service, follow the step.

~~~
sudo systemctl enable postgresql.service
sudo systemctl start postgresql.service
~~~

### Create Database User and Database
To create a `pgadmin` user and `pgadmin` database, follow the steps.

~~~
su -			# change to root
su postgres		# change to Postgres User
createuser --superuser -P pgadmin
createdb --encoding=utf-8 --owner=pgadmin pgadmin
~~~

### Change Authentication Method
To force the user authenticate using a password, we need change the config to use password authentication.

~~~
sudo vi /var/lib/pgsql/data/pg_hba.conf
~~~

change `peer` and `ident` to `md5`.

~~~
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            ident
# IPv6 local connections:
host    all             all             ::1/128                 ident
~~~

to

~~~
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
~~~

Restart PostgreSQL to make new authetication method take effect.

~~~
systemctl restart postgresql.service
~~~

### Testing installation
To test the installation, try to login as `pgadmin`.

~~~
psql -U pgadmin -w
Password for user pgadmin:
psql (9.1.7)
Type "help" for help.

pgadmin=# 
~~~