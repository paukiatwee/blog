---
layout: post
title: Install OpenVBX at CloudFoundry/AppFog to Send Bulk SMS
description: Install OpenVBX at CloudFoundry/AppFog to send bulk SMS within minutes for free
keywords: appfog, openvbs, bulk sms, sms marketing, twilio, clodfoundry
categories:
- cloud
tags:
- appfog
- cloudfondry
- openvbx
- bulk-sms
- howto
---

Ever wonder how to setup your own SMS gateway within minutes without actually code the app for 6 months? Now with [AppFog][appfog]/[Cloud Foundry][cloudfoundry], [Twilio][twilio] and [OpenVBX][openvbx] you can make it happen within minutes!


[OpenVBX][openvbx] allows developers to build voice and SMS applications for business, such as toll free phone numbers, call forwarding, voicemail, visual voicemail, voicemail transcriptions, and auto-attendants.  It's like Google Voice, but open source and for business.

<!--more-->

### Prerequisite
Before get started, you need have the following accounts, so if you does not yet, please go sign up:

- [AppFog][appfog] or [Cloud Foundry][cloudfoundry]
- [Twilio][twilio]

Then you download [OpenVBX][openvbx] from their site and unzip to a folder.

![Download OpenVBX](/img/posts/download-openvbx.png "Download OpenVBX")

### Install OpenVBX at AppFog

#### Login

First, you need login to [AppFog][appfog] using `af` command line tool.

~~~
af login
Attempting login to [https://api.appfog.com]
Email: username@domain.com
Password: **********
Successfully logged into [https://api.appfog.com]
~~~

#### Create AppFog App

~~~
af push openvbx
Would you like to deploy from the current directory? [Yn]: y
Detected a PHP Application, is this correct? [Yn]: y
1: AWS US East - Virginia
2: AWS EU West - Ireland
3: AWS Asia SE - Singapore
4: Rackspace AZ 1 - Dallas
5: HP AZ 2 - Las Vegas
Select Infrastructure: 3
Application Deployed URL [openvbx.ap01.aws.af.cm]: 
Memory reservation (128M, 256M, 512M, 1G, 2G) [128M]: 
How many instances? [1]: 
Create services to bind to 'openvbx'? [yN]: y
1: mongodb
2: mysql
3: postgresql
4: rabbitmq
5: redis
What kind of service?: 2
Specify the name of the service [mysql-50002]: mysql-openvbx
Create another? [yN]: 
Would you like to save this configuration? [yN]: 
Creating Application: OK
Creating Service [mysql-openvbx]: OK
Binding Service [mysql-openvbx]: OK
Uploading Application:
  Checking for available resources: OK
  Processing resources: OK
  Packing application: OK
  Uploading (21K): OK   
Push Status: OK
Staging Application 'openvbx': OK                                               
Starting Application 'openvbx': OK 

~~~

Go to your OpenVBX URL, you can see the app is deployed ucessfully.

![OpenVBX running](/img/posts/openvbx-running.png "OpenVBX running")

### Get Database Credential

Before proceed to install 

[cloudfoundry]: http://www.cloudfoundry.com
[appfog]: https://www.appfog.com
[twilio]: http://www.twilio.com
[openvbx]: http://www.openvbx.org
