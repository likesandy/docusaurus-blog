---
title: Teleport
---

在组件化开发中，我们封装一个组件A，在另外一个组件B中使用：
- 那么组件A中template的元素，会被挂载到组件B中template的某个位置；
- 最终我们的应用程序会形成一颗DOM树结构；

但是某些情况下，我们希望组件不是挂载在这个组件树上的，可能是移动到Vue app之外的其他位置：
- 比如移动到body元素上，或者我们有其他的div#app之外的元素上；
- 这个时候我们就可以通过teleport来完成；

[Teleport](https://v3.cn.vuejs.org/guide/teleport.html#teleport)是什么呢？
- 它是一个**Vue提供的内置组件**，类似于react的Portals；
- teleport翻译过来是心灵传输、远距离运输的意思；
  - 它有两个属性：
    - to：指定将其中的内容移动到的目标元素，可以使用选择器；
    - disabled：是否禁用 teleport 的功能； 

首先你需要在index.html里添加一个id为title的标签

之后我们就可以通过teleport来进行挂载

```html
<teleport to="#title">
  <h2>codertao</h2>
</teleport>
```

![](https://gitee.com/itsandy/picgo-img/raw/master/vue/composition/teleport.png)

当然，teleport也可以和组件结合一起来使用：

我们可以在 teleport 中使用组件，并且也可以给他传入一些数据；

如果我们将多个teleport应用到同一个目标上（to的值相同），那么这些目标会进行合并