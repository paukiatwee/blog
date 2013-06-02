---
layout: post
title: Better URL for SEO for E-Commerce and Dynamic Website
description: Better URL for Search Engine Optimazation for ecommerce and dynamic website. See how to design a better URL structure for your website.
categories:
- web
tags:
- seo
- ecommerce
- friendly url
---


Want better SEO for your e-commerce and dynamic website? Want to increase organic search for your e-commerce and dynamic website? This post will shows how to build better URL for your website and increase sell and better page impression.

<!--more-->

### Use Case

Let say your website is selling cars, and to have better SEO for your site, you can follow this post to design the URL that boost organic search to a better score. 

### Identify URL Hierarchy

To design a truely SEO friendly URL for this use case, let see what is the hierarchy for cars. To easily identify the hierarchy, you can follow your database design, for example, one make have one to many models, and one models have zero to many post on your website.

Then you can know that the URL structur is like:

~~~
http://exmple.com/make/model/post
~~~

Thus the actual URL might look like:

~~~
http://exmple.com/honda/civic/1-honda-civic-for-sell
~~~

Tips:

If the hierarchy is too deep, you can use shorter URL for each individual post, for example:

~~~
http://exmple.com/show/1-honda-civic-for-sell
~~~

But remember, include a breadcrumb in the page to let user to navigate up to the hierarchy, for example:

~~~
Home > Honda > Civic > Honda Civic For Sell
~~~

By thi way, the visitor will happy and Google Search will intelgent enough to identify your website structure.

### SEO Friendly URL

After identified the URL structure, the next step is to purpose a friendly URL. The followings shows the guideline for friendly URL:

1. All lowercase (Yes, some website still mixing uppercase and lowercase)
2. No whitespace, and whitespace is replaced by hyphen ("-")
3. Not too long (Less than 85 characters)
4. Contain one to three keywords, not too much
5. ASCII only characters

Using the guideline, a friendly URL example is show at below:

~~~
http://exmple.com/mercedes-benz/c-class/1-mercedes-benz-c-class-for-sell

or

http://exmple.com/honda/civic/1-honda-civic-for-sell
~~~

### Better Search Landing Page

So your website contain a search box for visitors to search for what they really want, instead of landing to a page with URL `http://exmple.com/search?q=honda`, you can redirect to a dedicated page for all honda's cars with better SEO URL as follow:

~~~
http://exmple.com/honda

or

http://exmple.com/honda/civic

for pagination

http://exmple.com/honda/civic?page=2

~~~

By using this tip, you provide a better SEO friendly URL for Search Engine to index and user friendly too.

### Ask Google Index Your URLs

The ultimate step is to index all of your URLs using `sitemap.xml` by generating all of the possible URLs for your website. But do not generate individual URL for each post in `sitemap.xml`, instead, Google will index the individual post via the search landing page.

Example of `sitemap.xml`:

~~~
<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>http://example.com</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>http://example.com/audi</loc>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>http://example.com/hyundai</loc>
    <changefreq>daily</changefreq>
  </url>
</urlset>
~~~
{: .language-xml}

Sitemaps are particularly helpful if:

1. Your site has dynamic content.
2. Your site has pages that aren't easily discoverd by Googlebot during the crawl process-for example, pages featuring rich AJAX or images.
3. Your site is new and has few links to it. (Googlebot crawls the web by following links from one page to another, so if your site isn't well linked, it may be hard to Google to discover it.)


### Conclusion

Following this post's tips and guideline, you can increase your website's organic search impression and more visitors will visit your site.
