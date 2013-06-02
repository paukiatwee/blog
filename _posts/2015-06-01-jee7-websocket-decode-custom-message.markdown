---
layout: post
title: Java JEE7 JAX-RS 2.0 Client Example
description: JEE 7 now include a new JAX-RS 2.0 API with naitive Client API. Follow this blog to know how to use JAX-RS 2.0 Client API.
categories:
- java
tags:
- jee7
- webservice
---

JEE6 JAX-RS 1.0 only include API for creating RESTful server application but no API for RESTFul client to consume the resources. [Jersey][Jersey], [RESTEasy][RESTEasy] provide different API and make the client code vendor dependent. Now JEE7 [JAX-RS 2.0][jax-rs] include Client API, which make the API vendor independent. In this blog, I will write the example of using [JAX-RS 2.0][jax-rs].

<!--more-->

### Dependencies

I use maven to manage dependencies, the following `pom.xml` show the dependencies that I used:

~~~
<dependencies>
  <dependency>
    <groupId>javax.ws.rs</groupId>
    <artifactId>javax.ws.rs-api</artifactId>
    <version>2.0</version>
    <scope>provided</scope>
  </dependency>
</dependencies>
~~~

The JAX-RS  2.0 implementation I use is Jersey bundled with [Glassfish 4.0][glassfish]. However, since it is vendor independent, so whether you use JBoss, or Glassfish is the same.

### Create Client to Consume Github V3 API

Now is tme to create Github client using JAX-RS 2.0. To create a instance of `Client`, use `ClientBuilder.newClient()` factory method to obtaint one. 

~~~
  Client client = ClientBuilder.newClient();
~~~

A Web resource can be accessed using a fluent API in which method invocations are chained to build and ultimately submit an HTTP request. The following example gets a `application/json` representation of the
resource identified by `https://api.github.com/users/octocat`:

~~~
  WebTarget userTarget = client.target("https://api.github.com/users/{username}");
  userTarget
      .resolveTemplate("username", "octocat")
      .request("application/json").get();
~~~

Note that the `{username}` is the template to access RESTFul API with dynamic value, in this above example, the placeholder is replaced with `octocat`. This is usefull to access different resources on the server.

The complete code to access `user` and `repositories`:

~~~
public class GithubClient {
    
    private Client client;
    private WebTarget userTarget;
    private WebTarget userRepoTarget;

    public GithubClient() {
        client = ClientBuilder.newClient();
        userTarget = client.target("https://api.github.com/users/{username}");
        userRepoTarget = client.target("https://api.github.com/users/{username}/repos");
    }
    
    public String findUserByUsername(String username) {
        Response res = userTarget
                .resolveTemplate("username", username)
                .request("application/json").get();
        return res.readEntity(String.class);
    }
    
    
    public String findRepositoriesByUser(String username) {
        Response res = userRepoTarget
                .resolveTemplate("username", username)
                .request("application/json").get();
        return res.readEntity(String.class);
    }
}
~~~

After created client to consume REST resource, now create a servlet to call the client:

~~~
@WebServlet(value = "/user")
public class ClientExampleServlet extends HttpServlet {
    
    @EJB
    GithubClient client;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().print(client.findUserByUsername(req.getParameter("username")));
    }
}
~~~

Then acces to browser [http://localhost:8080/CONTEXT/client?username=octocat][localhost] will show the following output:

~~~
{
   "login":"octocat",
   "id":583231,
   "avatar_url":"https://secure.gravatar.com/avatar/7ad39074b0584bc555d0417ae3e7d974?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
   "gravatar_id":"7ad39074b0584bc555d0417ae3e7d974",
   "url":"https://api.github.com/users/octocat",
   "html_url":"https://github.com/octocat",
   "followers_url":"https://api.github.com/users/octocat/followers",
   "following_url":"https://api.github.com/users/octocat/following{/other_user}",
   "gists_url":"https://api.github.com/users/octocat/gists{/gist_id}",
   "starred_url":"https://api.github.com/users/octocat/starred{/owner}{/repo}",
   "subscriptions_url":"https://api.github.com/users/octocat/subscriptions",
   "organizations_url":"https://api.github.com/users/octocat/orgs",
   "repos_url":"https://api.github.com/users/octocat/repos",
   "events_url":"https://api.github.com/users/octocat/events{/privacy}",
   "received_events_url":"https://api.github.com/users/octocat/received_events",
   "type":"User",
   "name":"The Octocat",
   "company":"GitHub",
   "blog":"http://www.github.com/blog",
   "location":"San Francisco",
   "email":"octocat@github.com",
   "hireable":false,
   "bio":null,
   "public_repos":3,
   "followers":360,
   "following":0,
   "created_at":"2011-01-25T18:44:36Z",
   "updated_at":"2013-06-02T04:35:58Z",
   "public_gists":4
}
~~~


### Conclusion

With JAX-RS 2.0, now RESTFul client API is first class citizen. Vendor locking is no more and developers only need create one client using standard API.

[glassfish]: http://glassfish.java.net
[RESTEasy]: http://www.jboss.org/resteasy
[Jersey]: http://jersey.java.net
[jax-rs]: http://jcp.org/en/jsr/detail?id=339
[localhost]: http://localhost:8080/CONTEXT/client?username=octocat