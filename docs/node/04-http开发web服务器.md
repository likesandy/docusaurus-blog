---
id: http
title: http开发web服务器
---

## 一、Web服务器

什么是Web服务器？

当应用程序（客户端）需要某一个资源时，可以向一个台服务器，通过Http请求获取到这个资源；提供资源
的这个服务器，就是一个Web服务器；

![](https://gitee.com/itsandy/picgo-img/raw/master/node/web服务器.png)

目前有很多开源的Web服务器：Nginx、Apache（静态）、Apache Tomcat（静态、动态）、Node.js

## 二、Web服务器初体验

我们不通过node来启动项目，而是按照一个第三方库[nodemon](https://www.npmjs.com/package/nodemon)来启动项目

当我们启动了项目，修改了配置的话，需要重新启动项目才会刷新的，通过nodemon就可以无需重新启动项目（达到热更新）

```sh
npm i -g nodemon
```

然后通过`nodemon xx.js`来启动项目

```js
const http = require('http')

// 创建web服务器
const server = http.createServer((req, res) => {
  res.end('Hello Server')
})

// 启动服务器，并且配置端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功');
})
```

## 三、创建服务器

创建服务器对象，我们是通过 createServer 或者是new Server来完成

```js
const server = http.createServer((req, res) => {
  res.end('Hello Server')
})
// 等价
const server2 = new http.Server((req, res) => {
  res.end('Hello Server')
})
```

内部源码：

```js
function createServer(opts, requestListener) {
  return new Server(opts, requestListener);
}
```

上面我们已经看到，创建Server时会
传入一个回调函数，这个回调函数在
被调用时会传入两个参数：

req：request请求对象，包含请求相
关的信息；

res：response响应对象，包含我们
要发送给客户端的信息；

## 四、监听主机和端口号

Server通过listen方法来开启服务器，并且在某一个主机和端口上监听网络请求：

也就是当我们通过 ip:port的方式发送到我们监听的Web服务器上时，我们就可以对其进行相关的处理；

listen函数有三个参数：
- 端口port: 可以不传, 系统会默认分配端, 后续项目中我们会写入到环境变量中；
- 主机host: 通常可以传入localhost、ip地址127.0.0.1、或者ip地址0.0.0.0，默认是0.0.0.0；
  - localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1；
  - 127.0.0.1：回环地址（Loop Back Address），表达的意思其实是我们主机自己发出去的包，直接被自己接收；
    - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ；
    - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的；
    - 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的；
  - 0.0.0.0：
    - 监听IPV4上所有的地址，再根据端口找到不同的应用程序；
    - 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的；
- 回调函数：服务器启动成功时的回调函数；


这里主要说一下127.0.0.1和0.0.0

通俗的说就是设置12.0.0.1通过ip地址是不会访问的，而设置0.0.0是可以通过ip地址进行访问的

这里我的本地ip地址是172.18.14.145

```js
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功');
})
```

![](https://gitee.com/itsandy/picgo-img/raw/master/node/配置0.0.0.0.png)

```js
// 404
server.listen(8888, '127.0.0.1', () => {
  console.log('服务器启动成功');
})
```

如果都不传的话会怎么样，这个其实[官网](https://nodejs.org/dist/latest-v17.x/docs/api/net.html#serverlistenport-host-backlog-callback)有详细的解答

## 五、request对象

### 1.url的处理

客户端在发送请求时，会请求不同的数据，那么会传入不同的请求地址：

服务器端需要根据不同的请求地址，作出不同的响应：

```js
if (req.url == '/login') {
  res.end('请先登录')
} else {
  res.end('Hello World')
}
```

### 2.url的解析

那么如果用户发送的地址中还携带一些额外的参数呢？

我们如何对它进行解析呢？使用内置模块url：

```js
const url = require('url')
const parseInfo = url.parse(req.url)
```

![](https://gitee.com/itsandy/picgo-img/raw/master/node/url解析.png)

但是 query 信息如何可以获取呢？

可以使用内置模块qs

```js
const qs = require('querystring')
const { pathname, query } = url.parse(req.url)
const queryInfo = qs.parse(query)
```
### 3.method的处理

在Restful规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：
- GET：查询数据；
- POST：新建数据;
- PATCH：更新数据；
- DELETE：删除数据；

所以，我们可以通过判断不同的请求方式进行不同的处理。
- 比如创建一个用户：
- 请求接口为 /users；
- 请求方式为 POST请求；
- 携带数据 username和password；

```js
const { pathname } = url.parse(req.url)
if (pathname === '/users') {
  if (req.method === 'POST') {
    req.on('data', (data) => {
      const { username, password } = JSON.parse(data)
      console.log(username, password);
    })
  }
}
res.end()
```

### 4.headers属性

在request对象的header中也包含很多有用的信息，客户端会默认传递过来一些信息：

![](https://gitee.com/itsandy/picgo-img/raw/master/node/headers.png)

content-type是这次请求携带的数据的类型：
- application/json表示是一个json类型；
- text/plain表示是文本类型；
- application/xml表示是xml类型；
- multipart/form-data表示是上传文件；

content-length：文件的大小和长度

keep-alive：
- http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断；
- 在http1.0中，如果想要继续保持连接：
  - 浏览器需要在请求头中添加 connection: keep-alive；
  - 服务器需要在响应头中添加 connection:keey-alive；
  - 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；
- 在http1.1中，所有连接默认是 connection: keep-alive的；
  - 不同的Web服务器会有不同的保持 keep-alive的时间；
  - Node中默认是5s
  
accept-encoding：告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 .gz文件；

accept：告知服务器，客户端可接受文件的格式类型；

user-agent：客户端相关的信息；

## 六、response对象

### 1. 响应结果

如果我们希望给客户端响应的结果数据，可以通过两种方式：
- [write](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responsewritechunk-encoding-callback)方法：这种方式是直接写出数据，但是并没有关闭流；
- [end](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responseenddata-encoding-callback)方法：这种方式是写出最后的数据，并且写出后会关闭流；

```js
res.write('Hello')
res.end(' World')
```

如果我们没有调用 end和close，客户端将会一直等待结果：

所以客户端在发送网络请求时，都会设置超时时间。

### 2.状态码

Http状态码（Http Status Code）是用来表示Http响应状态的数字代码：
- Http状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
- 常见的状态码是下面这些

![](https://gitee.com/itsandy/picgo-img/raw/master/node/http状态码.png)

设置状态码常见的有两种方式：
- [statusCode](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responsestatuscode)
- [writeHead](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responsewriteheadstatuscode-statusmessage-headers)

```js
res.statusCode = 401
res.writeHead(500)
```

### 3.响应头文件

返回头部信息，主要有两种方式：
- [setHeader](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responsesetheadername-value)：一次写入一个头部信息；
- [writeHead](https://nodejs.org/dist/latest-v17.x/docs/api/http.html#responsewriteheadstatuscode-statusmessage-headers)：同时写入header和status；

```js
res.setHeader('Content-Type', 'application/json;charset=utf8');
res.writeHead(200, {
  'Content-Type': 'text/html'
})
```

Header设置 Content-Type有什么作用呢？

默认客户端接收到的是字符串，客户端会按照自己默认的方式进行处理；

比如这里设置的200状态码的响应头文件类型是text/html的格式，那么到时候就会按照html的格式解析res的返回的内容

```js
res.end(`<h2>Hello World</h2>`)
```

## 七、发送网络请求

axios库可以在浏览器中使用，也可以在Node中使用：
- 在浏览器中，axios使用的是封装xhr；
- 在Node中，使用的是http内置模块；

```js
http.get('http://localhost:8888', (res => {
  res.on('data', (data) => {
    res.setEncoding('utf-8')
    console.log(data.toString());
  })
}))
```

```js
const res = http.request({
  method: 'POST',
  hostname: 'localhost',
  port: 8888,
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  })
})

res.end()
```

## 八、文件上传

后续更新。。。。