---
title: readonly API
---

## 一、readonly

我们通过reactive或者ref可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方（组件）的这个
响应式对象希望在另外一个地方（组件）被使用，但是不能被修改，这个时候如何防止这种情况的出现呢？
- Vue3为我们提供了[readonly](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly)的方法；
- **readonly会返回原生对象的只读代理**（也就是它依然是一个Proxy，这是一个**proxy的set方法被劫持**，并且不
能对其进行修改）；

其实学过v2的话，第一眼就知道这是什么意思了，只读的，那肯定一般都是用在传递子组件的props咯（单向数据流）

v2中如果开发者非要改props的值，也是没有办法的，有了readonly我们就可以编写对应的代码，来更好的来遵守单向数据流的规范

```html title="App.vue"
<template>
  <div>
    <h2>{{ counter.info.a.b.count }}</h2>
    <button @click="counter.info.a.b.count++">+1</button>
    <Home :info="info" />
  </div>
</template>

<script setup>
import { ref, readonly } from "vue";
import Home from "./Home.vue";
const counter = ref({
  name: "tao",
  info: {
    a: {
      b: {
        count: 0,
      },
    },
  },
});
const info = readonly(counter);
</script>
```

```html title="Home.vue"
<template>
  <div>
    <h2>{{ props.info.info.a.b.count }}</h2>
    <button @click="props.info.info.a.b.count++">+1</button>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
  },
});
</script>
```

在Home组件中是无法修改count的值的，但是在App自己组件内部就可以修改，这样就可以让多人开发中更好的遵循单向数据流的规范

## 二、shallowReadonly

[shallowReadonly](https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreadonly)是**浅只读**的

上面的案例中count是在info的深层里定义的，可以对它进行限制

如果是shallowReadonly的话，只能限制第一层，深层的属性是无法进行限制的

```html x
<script setup>
import {  shallowReadonly } from "vue";
const info = shallowReadonly(counter);
</script>
```
