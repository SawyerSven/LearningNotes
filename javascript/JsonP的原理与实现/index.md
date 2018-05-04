# jsonp 的原理与实现

> 原文地址: [Jsonp 的原理与实现](https://segmentfault.com/a/1190000007665361)

## 1. 概述

jsonp 是一种跨域通信的手段，它的原理其实很简单:

1.  首先是利用 script 标签的 src 属性来实现跨域。

2.  通过将前端方法作为参数传递到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。

3.  由于使用 script 标签的 src 属性，因此只支持 get 方法。

## 2. 实现流程

1.  设定一个 script 标签

```html
<script src="http://jsonp.js?callback=xxx"></script>
```

2.  callback 定义了一个函数名，而远程服务端通过调用指定的函数并传入参数来实现传递参数，将 for(response)传回客户端

3.  客户端接收到返回的 js 脚本，开始解析和执行 fn(response)

## 3. jsonp 的简单实现

一个简单的 jsonp 实现，其实就是拼接 url,然后将动态添加一个 script 元素到头部

```js
function jsonp(req) {
  var script = document.createElement("script");
  var url = req.url + "?callback=" + req.callback.name;
  script.src = url;
  document.getElementByTagName("head")[0].appendChild(script);
}
```

前端 js 示例

```js
function hello(res) {
  alert("hello " + res.data);
}
jsonp({
  url: "",
  callback: hello
});
```

服务器端代码

```js
var http = require("http");
var urllib = require("url");

var port = 8080;
var data = { data: "world" };

http.createServer(function(req, res) {
  var params = urllib.parse(req.url, true);
  if (params.query.callback) {
    console.log(params.query.callback);
    // jsonp
    var str = params.query.callback + "(" + JSON.stringify(data) + ")";
    res.end(str);
  }else{
      res.end();
  }
}).listen(port,function(){
    console.log('jsonp serve is on)
});
```

然而，这个实现虽然简单，但有一些不足的地方：

1.  回调必须是一个全局方法

2.  需要加入一些参数校验，确保接口可以正常执行。

## 4. 可靠的 jsonp 实现

```js
(function(global) {
  var id = 0,
    container = document.getElementsByTagName("head")[0];
  function jsonp(options) {
    if (!options || !options.url) return;

    var scriptNode = document.createElement("script");
    var data = options.data || {};
    var url = options.url;
    var callback = options.callback;
    var fnName = "jsonp" + id++;

    data["callback"] = fnName;

    var params = [];
    for (var key in data) {
      params.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      );
      url = url.indexOf("?")>0?(url+"&"):(url + "?");
      url += params.jion("&");
      scriptNode.src = url;
    }
  }
})(this);
```

// 使用示例

```js
jsonp({
  url: "www.example.com",
  data: { id: 1 },
  callback: function(ret) {
    console.log(ret);
  }
});
```
