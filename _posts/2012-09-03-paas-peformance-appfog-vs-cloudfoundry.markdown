---
layout: post
title: PaaS Performance&#58; AppFog vs CloudFoundry
categories:
- cloud
tags:
- appfog
- cloudfoundry
- performance
- load-test
---

Recently [PaaS][paas] (Platform as a service) is new technologies that grow rapidly, to provide a platform let developers focus on creating awesome application/website instead of configuring/maintaining servers. In this fews weeks, I was playing around two PaaS, which are [CloudFoundry][cloudfoundry] and [AppFog][appfog]. These two PaaS provider is really awesome, and CloudFoundry is open source PaaS that available on [github][cloudfoundry-source] and AppFog is based on CloudFoundry.

In this post, I will do a simple load test againts these two provider using Apache Benchmark, to see which one is performance better, and the result is surprising. The load test I doing is againt a simple Java web application available on at [here][source]. The main reason I use this simple application is because AppFog currently is having [issue][issue] with Java application, thus I only can use the sample provided by them. I deployed same application to both of the provider. For AppFog, I deployed to AWS Virginia DC.

<!--more-->

#### CloudFoundry
<table class="table table-striped table-condensed table-bordered table-hover">
  <tr>
  	<th>Cocurrent</th>
    <th>200 Requests</th>
    <th>600 Requests</th>
  </tr>
  <tr>
    <td>20</td>
    <td>118.76 Requests per second</td>
    <td>113.17 Requests per second</td>
  </tr>
  <tr>
    <td>40</td>
    <td>211.93 Requests per second</td>
    <td>226.95 Requests per second</td>
  </tr>
  <tr>
    <td>60</td>
    <td>317.88 Requests per second</td>
    <td>338.05 Requests per second</td>
  </tr>
  <tr>
    <td>80</td>
    <td>426.50 Requests per second</td>
    <td>408.15 Requests per second</td>
  </tr>
  <tr>
    <td>100</td>
    <td>482.07 Requests per second</td>
    <td>440.98 Requests per second</td>
  </tr>
  <tr>
    <td>120</td>
    <td>461.10 Requests per second</td>
    <td>471.54 Requests per second</td>
  </tr>
  <tr>
    <td>140</td>
    <td>443.34 Requests per second</td>
    <td>483.24 Requests per second</td>
  </tr>
  <tr>
    <td>160</td>
    <td>411.08 Requests per second</td>
    <td>502.00 Requests per second</td>
  </tr>
  <tr>
    <td>180</td>
    <td>410.2 Requests per second</td>
    <td>498.79 Requests per second</td>
  </tr>
</table>

#### AppFog

<table class="table table-striped table-condensed table-bordered table-hover">
  <tr>
  	<th>Cocurrent</th>
    <th>200 Requests</th>
    <th>600 Requests</th>
  </tr>
  <tr>
    <td>20</td>
    <td>22.90 Requests per second</td>
    <td>19.92 Requests per second</td>
  </tr>
  <tr>
    <td>40</td>
    <td>23.98 Requests per second</td>
    <td>24.56 Requests per second</td>
  </tr>
  <tr>
    <td>60</td>
    <td>25.46 Requests per second</td>
    <td>25.29 Requests per second</td>
  </tr>
  <tr>
    <td>80</td>
    <td>26.89 Requests per second</td>
    <td>22.27 Requests per second</td>
  </tr>
  <tr>
    <td>100</td>
    <td>24.75 Requests per second</td>
    <td>24.78 Requests per second</td>
  </tr>
  <tr>
    <td>120</td>
    <td>26.16 Requests per second</td>
    <td>25.66 Requests per second</td>
  </tr>
  <tr>
    <td>140</td>
    <td>24.20 Requests per second</td>
    <td>25.31 Requests per second</td>
  </tr>
  <tr>
    <td>160</td>
    <td>23.90 Requests per second</td>
    <td>24.51 Requests per second</td>
  </tr>
  <tr>
    <td>180</td>
    <td>22.40 Requests per second</td>
    <td>24.20 Requests per second</td>
  </tr>
</table>

#### Conclusion
From the two tables, we can notice that CloudFoundry can handle up to 500 requests per second while AppFog only 25 requests per second which is 20 times slower than CloudFoundry.


[paas]: http://en.wikipedia.org/wiki/Platform_as_a_service
[cloudfoundry]: http://www.cloudfoundry.com
[appfog]: http://appfog.com/
[cloudfoundry-source]: http://github.com/cloudfoundry
[source]: https://github.com/appfog/af-java-base
[issue]: https://groups.google.com/forum/#!topic/appfog-users/hxBxUe3c4QI
