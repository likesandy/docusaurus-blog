---
id: basic
title: web服务基础
---

## 一、Web服务器

什么是Web服务器？

当应用程序（客户端）需要某一个资源时，可以向一个台服务器，通过Http请求获取到这个资源；提供资源
的这个服务器，就是一个Web服务器；

![](https://gitee.com/itsandy/picgo-img/raw/master/node/web服务器.png)

目前有很多开源的Web服务器：Nginx、Apache（静态）、Apache Tomcat（静态、动态）、Node.js

## 二、Web服务器初体验

我们不通过node来启动项目，而是按照一个第三方库`nodemon`来启动项目

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
server.listen(8888, '127.0.0.1', () => {
  console.log('服务器启动成功');
})
```

![](https://gitee.com/itsandy/picgo-img/raw/master/node/node配置127.0.0.1.png)


如果都不传的话会怎么样，这个其实[官网](https://nodejs.org/dist/latest-v17.x/docs/api/net.html#serverlistenport-host-backlog-callback)有详细的解答

