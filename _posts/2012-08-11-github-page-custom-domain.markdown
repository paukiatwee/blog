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
<p><a href="http://github.com">Github.com</a> provide free blog platform for geeks and hackers. One of the features include custom domain, by default the blog domain is USERNAME.github.com after you create a repository with USERNAME.github.com at your github account.</p>
<p>To use custom domain, first you need to have a domain, either from <a href="http://godaddy.com">godaddy.com</a> or <a href="http://namecheap.com">namecheap.com</a>, in this post, I will use <a href="http://namecheap.com">namecheap.com</a>.</p>

<p>First, create a file <strong>CNAME</strong>. Write the custom domain in the file, in my case is <strong>dreamand.me</strong>. Then commit and push to your repository.</p>

<p>Then, login into your domain management page, add two A records to points to github pages' IP <strong>204.232.175.78</strong>. First record is point from naked domain, in my case is <strong>dreamand.me</strong>, second record is point from <strong>www</strong> subdomain. After setup, wait few minutes to let the DNS take effect.</p>

<p>You can have a look at my repository at <a href="https://github.com/paukiatwee/paukiatwee.github.com">here</a></p>

<img src="/img/posts/github-pages-custom-domain-with-namecheap.png" alt="github pages custom domain with namecheap.com" title="github pages custom domain with namecheap.com" class="thumbnail" />
