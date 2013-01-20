---
layout: post
title: How To Load Adbrite Ads Faster/Asynchronously at Your Site
description: How to load Adbrite ads at your site faster/asynchronously for better performance.
keywords: adbrite, performance, load faster, asynchronously, site engagement
categories:
- web-development
tags:
- adbrite
- performance
---

[adBrite][adbrite] is the largest independent ad exchange, reaching 300 million global unique visitors every month, including more than 150 million in the U.S. It is alternative to [Google Adsense][adsense].

In this post, I will describe how to make [adBrite][adbrite] ads load faster at your site to increase your site engagement.

<!--more-->

### Theory Behind Load Adbrite Ads Faster
Before implement the changes, let understand how to load Adbrite ads faster. Most modern browsers load iframe asynchronously without blocking other elements, thus the technique to load Adbrite ads **faster/asynchronously** is using html `iframe`.

### Create Iframe Page
First for all, you need create a iframe page for your site to include the `code` provided by [adBrite][adbrite] and name it as `ads-banner.html`. You can create few html for different types of ads.

Example `iframe` code:

~~~
<html>
<body style="margin: 0; padding: 0;">
<!-- Begin: adBrite, Generated: 2013-01-18 20:56:53  -->


<!-- your adbrite code goes here -->


<!-- End: adBrite -->
</body>
</html>
~~~

### Include Iframe to show adBrite Ads
To include adBrite ads, you need add a `iframe` element to the placement where you want to show ads.

~~~
<html>
<body>
	<header>...</header>
	<section id="content">...</section>
	<section id="site-bar">...</section>
	<section id="banner">

		<!-- add a iframe to link to your ads code -->
		<iframe src="/ads-banner.html" frameborder="0"></iframe>


	</section>
	<footer>...</footer>
</body>
</html>
~~~

### Test adBdite Ads Load Time
After you implement these changes, you will notice the page load time is significantly faster. Enjoy this enhancement and increase site engagement!





[adbrite]: http://www.adbrite.com/
[adsense]: https://www.google.com/adsense/