---
layout: post
title: How to backup PostgreSQL to localhost at AppFog
description: How to backup PosrgreSQL database from AppFog and import into other PostgreSQL database for development/backup usage.
keywords: backup, postgresql, appfog, localhost
categories:
- cloud
tags:
- backup
- postgresql-9
---

[AppFog, Inc.][appfog] is the leading platform-as-a-service provider of PHP, Ruby, Node.js, and Java solutions. Used by developers worldwide to deploy tens of thousands of applications, AppFog delivers a reliable, scalable and fast platform for deploying applications in the cloud. AppFog is a private company headquartered in Portland, Oregon.

In this post, I will teach how to backup [PostgreSQL][postgres] database to local. So let's get started!

<!--more-->

### AppFog Command Line Tool
First, make sure you have `af` gem installed.

~~~
gem install af
~~~

### Export Database
To backup, you need to export the database via `af` command

~~~
## login
af login
Attempting login to [https://api.appfog.com]
Email: user@domain.com
Password: *********
Successfully logged into [https://api.appfog.com]

## export database
af export-service myservice		# myservice is the database you want to export
Exporting data from 'myservice': OK
http://dl.ap01.aws.af.cm/serialized/postgresql/<you database>/snapshots/1871?token=<random token>
~~~

**Note:** `user@domain.com` is your AppFog username.

### Download exported Database Backup
Then download the backup via the link shows at the console.
Unzip the file, you will see two files in there:

*   manifest
*   content/1234.dump

### Import to Local PostgreSQL
The *.dump file is just normal PostregSQL dump file, so you can import into any PostgreSQL as normal dump file. Since it is *.dump file, you will need to use `pg_restore` or PGAdmin 3 Client to restore.

#### Restore Using pg_restore

~~~
## create databse if you dont have
psql -U pgadmin -W
Password for user pgadmin: 
psql (9.1.7)
Type "help" for help.

pgadmin=# CREATE DATABASE development;
CREATE DATABASE
pgadmin=# \quit


## restore into database
pg_restore -c -d development -U pgadmin -W 1234.dump 
Password: 
~~~

### Verify Restore
~~~
psql -U pgadmin -d development -W
Password for user pgadmin: 
psql (9.1.7)
Type "help" for help.

development=# \d
                  List of relations
 Schema |         Name          |   Type   |  Owner  
--------+-----------------------+----------+---------
 public | test                  | table    | pgadmin
 public | test_id_seq           | sequence | pgadmin
(2 rows)
~~~

**Note:** `pgadmin` is the database username, yours might not the same.

**Note:** `development` is the database name, you can use your prefered name.

**Note:** `1234.dump` is the dump file name, your backup might not have same name.


[appfog]: http://appfog.com
[postgres]: http://www.postgresql.org