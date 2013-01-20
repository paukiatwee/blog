---
layout: post
title: How To Update AppFog App With Scheduled Downtime Page
description: This post will describe how to update your AppFog app whith scheduled downtime with a temporary page to avoid display ugly AppFog default error page.
keywords: appfog, downtime, scheduled downtime, no downtime
categories:
- cloud
tags:
- appfog
- scheduled-downtime
---

[Appfog][appfog] is one of the fast growing PaaS providers out there, however, some of the feature is not available yet, for example, a custom page to show during scheduled down time. This is one of the [feature request][maintenance-mode], please vote it to make sure AppFog will implement this ASAP.


In this post, I will describe how to make your own maintanance page, so let's get started.

<!--more-->

### AppFog Default Error Page
AppFog display their default error page when your site is down during update, which is kind of not so userfriendly for your site visitor.

![AppFog Default Error Page](/img/posts/appfog-404.png "AppFog Default Error Page")


### Create a App to Display Scheduled Downtime Page
To display scheduled downtime page, you will need a simple app hosted at AppFog, most recommended way is to create a simple small [Ruby Sinatra][sinatra], [NodeJS Express][express], or [Python Flask][flask] app. I will not go through how to create those app in details, you can find a lot tutorials via Google Search.

### Before Update AppFog
Before update your main app, you need bind the scheduled downtime app to your main app's domain. For example, is your main app domain is `yourdomain.com`, then you need bind scheculed downtime app into this domain before you update the main app.


Screenshot:

![AppFog Custom Downtime Page](/img/posts/appfog-downtime-custom-page.png "AppFog Custom Downtime Page")


### Update AppFog App
Once your scheduled downtime page app is bind to same domain as your main app, you can start to update main app. During the main app's downtime, all visitors will serve by your custom scheduled downtime page app without showing AppFog's default error page thus increase your site engagement. You can futher develop the app to let user to enter email address to notify them after update is completed.



[appfog]: http://www.appfog.com/
[maintenance-mode]: http://feedback.appfog.com/forums/171983-appfog/suggestions/3563669-maintenance-mode
[sinatra]: http://www.sinatrarb.com/
[express]: http://expressjs.com/
[flask]: http://flask.pocoo.org/