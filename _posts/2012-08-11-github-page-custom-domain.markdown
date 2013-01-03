---
layout: post
title: Custom domain for github pages
description: Custom domain for github pages 
categories:
- github-page
tags:
- dns
- cname
- namecheap
---
[Github.com][github] provide free blog platform for geeks and hackers. One of the features include custom domain, by default the blog domain is **USERNAME.github.com** after you create a repository with **USERNAME.github.com** at your github account.

<!--more-->

To use custom domain, first you need to have a domain, either from [godaddy.com][godaddy] or [namecheap.com][namecheap], in this post, I will use [namecheap.com][namecheap].

First, create a file **CNAME**. Write the custom domain in the file, in my case is **dreamand.me**. Then commit and push to your repository.

Then, login into your domain management page, add two A records to points to github pages' IP **204.232.175.78**. First record is point from naked domain, in my case is **dreamand.me**, second record is point from **www** subdomain. After setup, wait few minutes to let the DNS take effect.

You can have a look at my repository at [here][blog_source].

![github pages custom domain with namecheap.com](/img/posts/github-pages-custom-domain-with-namecheap.png "github pages custom domain with namecheap.com")

[github]: http://github.com
[godaddy]: http://godaddy.com
[namecheap]: http://namecheap.com
[blog_source]: https://github.com/paukiatwee/paukiatwee.github.com
