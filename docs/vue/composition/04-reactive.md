---
title: Reactive API
---

## 一、reactive

[reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)函数定义一个对象类型的响应式数据，返回一个代理对象（proxy的实例对象）

```html
<template>
  <div>
    <h2>{{ counter.count }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const counter = reactive({
  count: 0,
});
const increment = () => {
  counter.count++;
};
</script>
```

reactive定义的响应式数据是**深层次**的

内部基于ES6的proxy进行实现的，通过代理对象操作源对象内部数据进行操作

```html
<template>
  <div>
    <h2>{{ counter.count }}</h2>
    <h2>{{ counter.a.b.c }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const counter = reactive({
  count: 0,
  a: {
    b: {
      c: "ccc",
    },
  },
});
const increment = () => {
  counter.count++;
  counter.a.b.c = "eee";
};
</script>
```

## 二、shallowReactive

shallowReactive是**浅层的**

```html
<template>
  <div>
    <h2>{{ counter.info.count }}</h2>
    <button @click="counter.info.count++">+1</button>
  </div>
</template>

<script setup>
import { shallowReactive } from "vue";
const counter = shallowReactive({
  info: {
    count: 0,
  },
});
</script>
``