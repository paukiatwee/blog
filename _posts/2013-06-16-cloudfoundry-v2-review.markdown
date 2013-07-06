---
layout: post
title: Cloud Foundry V2 Hosted Developer Edition Review
description: Cloud Foundry general available offer more features and start paid as paid services with free trial of 60 days with 2GB of RAM. Know more about the features in this post.
categories:
- cloud
tags:
- paas
- cloudfoundry
---

Cloud Foundry just moved to general available as paid service witn trial of 60 days of 2GB of RAM. During developer preview of Cloud Foundry, they operate under VMWare and now moved to Pivotal as paid service. Let see what CLoud Foundry provide to developers in this new raising PaaS industry.

<!--more-->

### Cloud Foundry Pricing Structure

Cloud Foundry released their pricing structure, their pricing is based on RAM usage, which is appropiate in this PaaS industry. Cloud Foundry pricing is $0.03/GB/HR. It is pay as you go model, for example, let say you allocat 1 GB odf memory to application and you running two instances for 24 hours, then your billing will include $0.03 * 1GB * 24 HR = $0.72. If you run for one month, the price is around $21.6. The pricing is competitive with other PaaS provider such as Heroku and Openshift. Using Heroku with two dynos will cost $35 where first dyno is free(equalvalent to $0.097/GB/HR). While Openshift provide free service with 3 gears (512MB of memory each).

![Cloud Foundry Pricing](/img/posts/cloud/cloudfoundry-pricing.png "Cloud Foundry Pricing")

### Cloud Foundry New Marketplace

Heroku begin as PaaS giant and provive Marketplace, now this become a trend in PaaS industry, so the PaaS will have more features and the core product still can focus on building reliable platform for developers. Cloud Foundry is no exception, they provide a Marketplace as well with some other features/add-on that are not provided in core platform. Sice Cloud Foundry just moved to paid service, their Marketplace still not much options avaiable. As the time of writing, only 7 add-ons are available, but more and paid service will coming soon.

![Cloud Foundry Marketplace](/img/posts/cloud/cloudfoundry-marketplace.png "Cloud Foundry Marketplace")

### Cloud Foundry Users and Space Managements

Cloud Foundry is open source project by VMWare and most of the VMWare customers are enterprise and large companies. Thus users management is very important aspect of the platform for enterprise and large companies. Cloud Foundry Hosted provide the same users management in the cloud with web console to access. This make Cloud Foundry very suitable for small freelances to large companies. Heroku on PaaS space is quite long enough and still do not have users and space management. Probably Heroku only target small companies?

Cloud Foundry include space management as well for managing different environments. You can think space as environment such as *production*, *Staging*, and *Development*. This allow access control to avoid anyone in the organization to start, stop production applications. This is vefy good features for enterprise companies.

![Cloud Foundry Users and Space Management](/img/posts/cloud/cloudfoundry-usersmanagement.png "Cloud Foundry Users and Space Management")


### Conclusion

What I really like about Cloud Foundry is the ability to allocate appropriate memory to my application, most of the PaaS provides only allow fixed amout of memory, such as Heroku allow 512MB, 1GB and Openshift allow 512MB and 1GB. With the paid service of Cloud Foundry, their pricing is competitive as well. I hope Cloud Foundry keep moving forward and offer multiple regions deployment to stand up from other competitors, since multiple region deploymements will be killer features of PaaS space now.