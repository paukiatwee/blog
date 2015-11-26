---
layout: post
title: Java Websocket API With Custom Decoder
description: Java JEE7 now support websocket and this post will teach you how to use custom decoder to decode json from client.
categories:
- java
tags:
- websocket
- realtime
---

Java JEE7 now support Websocket with realtime bidirection communication from server to clients. The websocket API provide extendsible API to build custom decoder to decode message from client.

In this post, you will learn how to use java websocket API to build custom decoder.


<!--more-->

### Java WebSocket Maven Dependencies

I use maven to manage dependencies, the following `pom.xml` show the dependencies that I used:

~~~
<dependencies>
    <dependency>
      <groupId>javax</groupId>
      <artifactId>javaee-web-api</artifactId>
      <version>7.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- optional -->
    <dependency>
      <groupId>org.glassfish</groupId>
      <artifactId>javax.json</artifactId>
      <version>1.0</version>
      <scope>runtime</scope>
    </dependency>

</dependencies>
~~~

The example is using the coordinate of the mouse clicks and will send as `JSON` to server, the POJO class:

~~~
public class Coordinate {

    private int x;
    private int y;

    public void setX(int x) {
        this.x = x;
    }

    public int getX() {
        return x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getY() {
        return y;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Coordinate{");
        sb.append("x=").append(x);
        sb.append(", y=").append(y);
        sb.append('}');
        return sb.toString();
    }
}
~~~

### Decoders to Convert WebSocket Messages into Java Objects

To implement decoder, the following interface should be used:

* `Decoder.Text<T>` for text messages
* `Decoder.Binary<T>` for binary messages

Here is the example convert `JSON` string to `Coordinate` object:

~~~
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import java.io.StringReader;

public class CoordinateDecoder implements Decoder.Text<Coordinate> {

    /**
     * convert {"x":x, "y": y} to Coordinate POJO
     */
    @Override
    public Coordinate decode(String s) throws DecodeException {
        JsonObject json = Json.createReader(new StringReader(s)).readObject();
        Coordinate coordinate = new Coordinate();
        coordinate.setX(json.getInt("x"));
        coordinate.setY(json.getInt("y"));
        return coordinate;
    }

    /**
     *  whether the given String can be decoded into an object of type T
     */
    @Override
    public boolean willDecode(String s) {
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}

~~~

After implemented custom decoder, now is time to implement the websocket server side endpoint:

~~~
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint(value = "/ws", decoders = {CoordinateDecoder.class})
public class WebsocketDecoderExampleServer {

    private static final Logger LOGGER = Logger.getLogger(WebsocketDecoderExampleServer.class.getName());


    @OnOpen
    public void onOpen(Session session) {
        LOGGER.log(Level.INFO, "New connection with client: {0}",
                session.getId());
    }

    @OnMessage
    public String onMessage(Coordinate coordinate, Session session) throws IOException, EncodeException {
        LOGGER.log(Level.INFO, "New message from Client [{0}]: {1}",
                new Object[] {session.getId(), coordinate});
        return "Server received [" + coordinate + "]";
    }

    @OnClose
    public void onClose(Session session) {
        LOGGER.log(Level.INFO, "Close connection for client: {0}",
                session.getId());
    }

    @OnError
    public void onError(Throwable exception, Session session) {
        LOGGER.log(Level.INFO, "Error for client: {0}", session.getId());
    }

}
~~~


The following code is for client side:

~~~
<html>
<head>
  <title></title>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/css/bootstrap.min.css"/>
  <style type="text/css">
    .canvas {
      width: 500px;
      height: 500px;
      border: 2px solid #ADFFA6;
    }
    .server {
      border-top: 1px solid #a2a2a2;
      border-left: 1px solid #a2a2a2;
      border-right: 1px solid #a2a2a2;
      border-bottom: 1px solid  #FFA6A6;
      padding: 5px;
    }

    #output {
      height: 500px;
      overflow-y: scroll;
    }
  </style
</head>
<body
<div class="container"
  <div class="row">
    <div class="col-lg-6">
      <div class="canvas"></div>
    </div>
    <div class="col-lg-6">
      <div id="output"></div>
    </div>
  </div>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript">
  $(function() {
    var chatClient = new WebSocket("ws://localhost:8080/ws");

    chatClient.onmessage = function(e) {
      var p = document.createElement("p");
      p.setAttribute("class", "server");
      p.innerHTML = "Server: " + e.data;
      var container = document.getElementById("output");
      container.insertBefore(p, container.firstChild);
    }

    $(".canvas").click(function(e) {
      var posX = $(this).position().left,
          posY = $(this).position().top;
      var coordinate = {
        x: (e.pageX - posX),
        y:(e.pageY - posY)
      };
      chatClient.send(JSON.stringify(coordinate));
    });
  });
</script>
</body>
</html>
~~~

### Running Java Websocket App with Custom Decoder

When run the app and browse to [localhost][localhost], click on the green area.
Here are the screenshots for example app:

![Initial load page](/img/posts/jee7/websocket-java-custom-type-1.png "Initial load page")

![Server reply message](/img/posts/jee7/websocket-java-custom-type-2.png "Server reply message")

Console logs:

~~~
Oct 27, 2013 10:44:56 AM WebsocketDecoderExampleServer onOpen
INFO: New connection with client: websocket-1
Oct 27, 2013 10:47:08 AM WebsocketDecoderExampleServer onMessage
INFO: New message from Client [websocket-1]: Coordinate{x=111, y=13}
Oct 27, 2013 10:47:12 AM WebsocketDecoderExampleServer onMessage
INFO: New message from Client [websocket-1]: Coordinate{x=315, y=19}
Oct 27, 2013 10:47:13 AM WebsocketDecoderExampleServer onMessage
INFO: New message from Client [websocket-1]: Coordinate{x=552, y=21}
~~~

[localhost]: http://localhost:8080
