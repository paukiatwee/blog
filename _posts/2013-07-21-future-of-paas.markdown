---
layout: post
title: What are the features that PaaS providers must have?
description: PaaS now is grwoing petty fast, while it is still relatively new industry, what are the features that they must have?
categories:
- cloud
tags:
- paas
- cloudfoundry
- heroku
- openshift
---

Do you want ability to push application to cloud in minutes? Scale to multiple intances wihtout configure load balancer? Deploy without downtime? The future of web development will be like this with the PaaS.

However, since this industry still new and recently just have few PaaS providers start to enter this space to compete, the features of the PaaS still incompete and some critical features need consider when design and develop new PaaS platform. In this post, I will list down all of the features that PaaS must have in future to really make the PaaS to be the developer's choice.

<!--more-->

### Top Features PaaS Must Have

#### Memory Management

PaaS provider must have the ability to have custom memory allocation for all developers. This is especially important if you adversise your platform support multiple langauges but your platform only have one or two memory allocation options? No developers will run Java application on 512MB of memory and no one will run small NodeJS application on 512MB of memory as well. So custom memory allocation is very important for developers when they consider the patform.


#### Pricing Model

The main point of using PaaS is to remove the pain of manage system/os and hardware. One of the PaaS provide also the ability to scale up and down instantly. However, if the pricing model does not allow you to do that, then there is not point to market as scale instantly. For example, if the provider's pricing model is based on subscription, then the memory limit for the plan will not allow the developers to scale up instantly if the memory allocation is reached the plan's limit. He need to upgrade to larger plan before able to scale up again. If the spike only for last two or three days, the he will wasted his memory for the rest of the days of the month. Since he will not need that much memory/instance again. The future of PaaS should using pay as you go pricing model.

#### Multiple Data Centers

I believe must of the PaaS customers are from US. However, the future of PaaS will be multiple data center deployments. Developers should have options for them to deploy to. Mininum of three regions avaibility is required for future. The three regions I have in mind are US, Asia, and Europe. This also important for the provider as they can distribute the load/customers across regions to **avoid one down all down** situation. For example, **Heroku** have grow too large till their load balancing is [not optimal anymore][heroku]  due to large number of dynos. If Heroku have multiple deployment options, the load will distibute across regions since Asia customers will deploy to Asia data center and Europe customers will deploy to Europe data centers.

#### Deployment

PaaS is suppose to ease the deployment of the applications. And one of the important ability is able to deploy without downtime. Or at least suring deployment downtime, show a custom page to visitors rather than showing provider's error page or the domain is unreaachble.


### Top Players In PaaS

Here I will show the comparison of current top PaaS providers, Heroku, CloudFoundry, and OpenShift.


<table class="table table-striped table-condensed table-bordered table-hover">
  <tr>
    <th style="width: 170px; vertical-align: middle">Features</th>
    <th>PaaS</th>
    <th>Status</th>
  </tr>
  <tr>
    <td rowspan="3">Memory Management</td>
    <td>Heroku</td>
    <td>512MB and 1G</td>
  </tr>
  <tr>
    <td>CloudFoundry</td>
    <td>Custom memory allocation</td>
  </tr>
  <tr>
    <td>OpenShift</td>
    <td>512MB and 1G</td>
  </tr>
  <tr>
    <td rowspan="3">Pricing Model</td>
    <td>Heroku</td>
    <td>Pay as you go</td>
  </tr>
  <tr>
    <td>CloudFoundry</td>
    <td>Pay as you go</td>
  </tr>
  <tr>
    <td>OpenShift</td>
    <td>Pay as you go</td>
  </tr>
  <tr>
    <td rowspan="3">Data Centers</td>
    <td>Heroku</td>
    <td>US and Europe</td>
  </tr>
  <tr>
    <td>CloudFoundry</td>
    <td>US</td>
  </tr>
  <tr>
    <td>OpenShift</td>
    <td>US</td>
  </tr>
  <tr>
    <td rowspan="3">Deployment</td>
    <td>Heroku</td>
    <td>Have downtime and custom maintancen page</td>
  </tr>
  <tr>
    <td>CloudFoundry</td>
    <td>Have downtime</td>
  </tr>
  <tr>
    <td>OpenShift</td>
    <td>Have downtime (Only support for JBoss AS 7(hot deploy), PHP and Perl for no downtime)</td>
  </tr>
</table>


### Conclusion

Currently there is no PaaS provider that have all of the mentioned ability/features. Hope the PaaS space will be more competitive and grow to ease application management.

[heroku]: http://news.rapgenius.com/James-somers-herokus-ugly-secret-lyrics