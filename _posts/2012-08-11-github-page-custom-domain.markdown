---
layout: post
title: Custom domain for github pages
categories:
- github-page
tags:
- dns
- cname
- namecheap
---
<p><a href="http://github.com" target="_blank">github.com</a> provide free blog platform for geeks and hackers. One of the features include custom domain, by default the blog domain is USERNAME.github.com after you create a repository with USERNAME.github.com at your github account.</p>
<p>To use custom domain, first you need to have a domain, either from <a href="http://godaddy.com" target="_blank">godaddy.com</a> or <a href="http://namecheap.com" target="_blank">namecheap.com</a>, in this post, I will use <a href="http://namecheap.com" target="_blank">namecheap.com</a>.</p>

<p>First, login into your domain management page, then add two A records to points to github pages' IP <strong>204.232.175.78</strong>. First record is point from naked domain, in my case is <strong>dreamand.me</strong>, second record is point from <strong>www</strong> subdomain. After setup, wait few minutes to let the DNS take effect.</p>

<img src="/img/posts/github-pages-custom-domain-with-namecheap.png" alt="github pages custom domain with namecheap.com" title="github pages custom domain with namecheap.com" class="thumbnail" />
