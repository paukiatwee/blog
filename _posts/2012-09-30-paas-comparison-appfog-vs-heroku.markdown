---
layout: post
title: PaaS Comparison&#58; AppFog vs Heroku
categories:
- cloud
tags:
- appfog
- heroku
---

Recently I have been playing PaaS for test thing out, and with recent General Available of [AppFog][appfog], PaaS providers' competition become more interesting. In this post, I will compare [AppFog][appfog] with a mature PaaS provider, [Heroku][heroku].

So, there are many people think, what are their primary features that make you stick to particular PaaS provider? Lets do the comparison using case study.

### Memory Management

Do you ever come across a senario where your app is consume 80MB most of the time, or well, 512MB is not enough for you when you deploy a huge Java Web Application (Yeah, Java)?

With AppFog, this is not an issue for you, since they allow developer to configure how much memory they want to allocate to their app. Wow, awesome right? No more wasting your money to invest on ten dynos on heroku, where a lot of memory is not used.

However, this can be a issue for you, if you choose to deploy your app to [Heroku][heroku], you will need to buy a [dyno with 512MB][dyno] of RAM where either sometime is too larger, or too small. If your application consume 100MB RAM, and you deploy ten dynos, well, you wasted (512 - 100) * 10 = 4120MB of RAM!

### Pricing Model

I have a web application on production, suddenly my application is getting huge traffic after a tweet by a famous person. I want quickly scale my application to handle such traffic.

According to AppFog pricing model, it is by subscription based model by select a plan. However, assume their able to upgrade plan within minutes, then it is fine. But what if upgrade plan required more than 4 hours? Maybe your application will crash before upgrade to better plan. Futhermore, after 1 week your application traffic is back to normal, I believe you want to downgrade plan to save some money, which required you to submit a ticket to their support. However, AppFog offer free plan with [2GB of RAM][appfog-free], equivalent up to 4 dynos at heroku.

Heroku is pay as you go, scale on demand PaaS, so this kind of senerio will not affect heroku users. Futhermore, you can scale to 10 dynos for an hours then scale back to 2 dynos. Cool.

### Data Centers
I have a application, with the target users are from Asia. I want able to serves my content from data center that with low latency to Asia visitors.

AppFog is the first PaaS provider provide cross regions deployment option to its customers. It allow me, a developer from Asia to deploy application that nearby here, such as Singapore. This enable my application serves visitors faster.

Heroku does not support cross regions deployment option to its customers. I have a test application writed in Ruby On Rails, with a feature to upload a image to AWS S3 bucket at Singapore. But its not stable because there is 30 seconds timeout on heroku platform, which is reasonable constraint. But I just cant accept the application always failed to upload a image file. The workflow petty simple:

Upload file to application at Heroku -> scale image into 3 deviations -> upload images to my AWS S3 bucket at Singaprore.

Maybe I need redesign my application to use dyno worker, Resque, Redis to do such thing? Wow, I give up.


### Data Store

Most of the application required at least one datastore, let say I want a Relational Database for my application, I want able manual backup before deployment, daily automatic backup, and other features.

AppFog just GA not long ago, currently they have free shared DB, such as mongoDB, MySQL, Postgres. However, they still no plan for serious production database option, but only through add-on such as ClearDB. But their [roadmap][appfog-roadmap] included dedicated database, hopefully will be feature rich database plan and release soon!

With heroku, it offer serious database production for RDBMS, Postgres. Futhermore, their offer also include other nice feature such as fork, follow, data clip and so on.

### Deployment

Assume I use scripting language such as Ruby for my application, I want able to deploy to production with simplest way, such as **git push**.

Unforturenly AppFog does not have **git** integration into deployment, unless you need a custom application to deploy for you, such as [node-pusher][node-pusher].

Heroku's deployment is tightly integrated with git, it is great and most of the people use **git** anyway.

### Conclusion

The table below show the sumarrized comparison.

<table class="table table-striped table-condensed table-bordered table-hover">
  <tr>
  	<th style="width: 170px">Features</th>
    <th>Winner</th>
    <th>My Choose</th>
  </tr>
  <tr>
    <td>Memory Management</td>
    <td>AppFog</td>
    <td>AppFog!</td>
  </tr>
  <tr>
    <td>Pricing Model</td>
    <td>Heroku</td>
    <td>AppFog free 2GB of RAM! Which is enough for me to handle small to medium spike traffic.</td>
  </tr>
  <tr>
    <td>Data Centers</td>
    <td>AppFog</td>
    <td>AppFog for Asia!</td>
  </tr>
  <tr>
    <td>Data Store</td>
    <td>Heroku</td>
    <td>Heroku Postgres is awesome!</td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>Heroku</td>
    <td>For scripting language such as Ruby, Heroku! While Java, not much different for these two providers.</td>
  </tr>
</table>

My choose of PaaS is [AppFog][appfog], even the comparison shows Heroku is better. There are some roadblock in heroku cause me to choose AppFog such as memory managemet and Data Centers.



[appfog]: http://appfog.com
[heroku]: http://heroku.com
[node-pusher]: https://github.com/anoopsinha/node-vmc-pusher
[dyno]: https://devcenter.heroku.com/articles/dynos
[appfog-roadmap]: http://docs.appfog.com/roadmap
[appfog-free]: https://www.appfog.com/products/appfog/pricing/