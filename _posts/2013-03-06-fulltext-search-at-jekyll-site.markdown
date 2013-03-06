---
layout: post
title: Fulltext Search on Jekyll Site
categories:
- web
tags:
- fulltext search
- jekyll
- solr
- lunrjs
---

I power my blog using jekyll, a static blog generator. Recenty I saw a javascript full text search engine, [lunr][lunr] that really awesome. So I integrate into my blog and now my blog have full text search capibility! Awesome! So in this blog I will document and describe how I did it.
<!--more-->

### Download lunr
Before get started, you need download [lunr][lunr] at https://github.com/olivernn/lunr.js and include in your blog js folder.

### Index Content
Before doing full text search, you need to index your blog content. First, create a `post.json` file in `_includes` folder as template to render post document:

~~~
{
  "id"    : "http://dreamand.me{{ post.url }}",
  "title"   : "{{ post.title }}",
  "content" : "{{ post.content | strip_html | strip_newlines | remove:'"'  }}"
}
~~~

After that, create a `search.js` at the root of the blog to hold the blog contents:

~~~
---
---
var docs = 
[ 
{% for post in site.posts limit:10 %}
  {% include post.json %},
{% endfor %}
];
// init lunr
var idx = lunr(function () {
  this.field('title', 10);
  this.field('content');
})
// add each document to be index
for(var index in docs) {
  idx.add(docs[index]);
}
~~~

**Note:** The file must begin with YAML front matter block so it will be processed by Jekyll as special files.

Now your blog is index under `idx` object and you can search it. At the end of the documents, create a `lunr` with index fields **title** and **content** to be index.

### Search
Now is time to create search capibility using html, javascript. First, include `search.js` and `lunr` js in your site:

~~~
<script src="/js/lunr.min.js"></script>
<script src="/search.js"></script>
~~~

Is time to create `form` element for user to search, I have created partial `search.html` for display search form:

~~~
<div class="minor well shadow">
  <h3>Search</h3>
  <form>
    <div class="input-append">
      <input type="search" name="q" id="q" placeholder="Enter keywords..."/>
      <button class="btn" type="button">GO!</button>
    </div>
  </form>
</div>
~~~

Finally, add jquery to handle search event, add into `search.js` or other javascript file:

~~~
$(function() {
  $("#search button").click(function() {
    search();
  });
  $("#search input").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      search();
    }
  });
})

function search() {
  var result = idx.search($("#search input").val());
  if(result && result.length > 0) {
    window.location.replace(result[0].ref);
  } else {
    alert("Found nothing");
  }
}
~~~

### Improvement

Currently the search is not so user friendly where autocomplete is not available. When I am free I will improve it.

### Summary
Using [lunr][lunr], we able to bring the power of fulltext search to static generated blog, [jekyll][jekyll]. Cool.

[lunr]: https://github.com/olivernn/lunr.js
[jekyll]: http://jekyllrb.com/
