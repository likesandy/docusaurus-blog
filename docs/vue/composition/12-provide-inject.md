---
title: provide/inject
---

事实上我们之前还学习过Provide和Inject，Composition API也可以替代之前的 [Provide 和 Inject](https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html#provide-inject) 的选项。

我们可以通过 provide来提供数据：

可以通过 provide 方法来定义每个 Property；

provide可以传入两个参数：
- name：提供的属性名称；
- value：提供的属性值；

在 后代组件 中可以通过 inject 来注入需要的属性和对应的值：

可以通过 inject 来注入需要的内容；
- 要 inject 的 property 的 name；
- 默认值；

```html title="App.vue"
<template>
  <div>
    <h2>{{ count }}</h2>
    <button @click="count++">+1</button>
    <Home />
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import Home from "./Home.vue";
const count = ref(0);
provide("count", count);
</script>
```

```html title="Home.vue"
<template>
  <div>
    <h2>{{ count }}</h2>
    <button @click="count++">+1</button>
  </div>
</template>

<script setup>
import { inject } from "vue";
const count = inject("count");
</script>
```
:::info
其实你会发现这并不是很好，我通过provide传递了数据，你接收的时候可以随便改我的数据，并不符合我们开发的规范（**单向数据流**）
:::

学了前面的知识你肯定会想到传递一个readonly 或者只传递一个修改数据的方法

```js
const increment = () => count.value++;
provide("increment", increment);
```

```js
const count = ref(0);
const readonlyCount = readonly(count);
provide("count", readonlyCount);
```