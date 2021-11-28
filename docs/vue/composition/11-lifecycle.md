---
title: 生命周期钩子
---

我们前面说过 setup 可以用来替代 data 、 methods 、 computed 、watch 等等这些选项，也可以替代 生命周
期钩子。

那么setup中如何使用生命周期函数呢？

可以使用直接导入的 onX 函数注册生命周期钩子；

![](https://gitee.com/itsandy/picgo-img/raw/master/vue/composition/生命周期钩子.png)

setup函数其实是在beforcreate之前就执行了

:::tip
对于以前我们在beforcreate和created生命周期中做的事情都可以在setup中做
:::