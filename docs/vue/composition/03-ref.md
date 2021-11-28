---
title: Ref API
---

## 一、ref

如果想让setup中定义的数据具有响应式的特性，那么我们可以使用[ref](https://v3.cn.vuejs.org/api/refs-api.html#ref)函数

ref 会返回一个可变的响应式对象，该对象作为一个 响应式的引用 维护着它内部的值，这就是ref名称的来源(**引用对象**)

它内部的值是在ref的 value 属性中被维护的；

```js
<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
```

这里有两个注意事项：
- 在模板中引入ref的值时，Vue会**自动帮助我们进行解包操作**，所以我们并**不需要在模板中通过 ref.value 的方式**
来使用；
- 但是在 setup 函数内部，它依然是一个 ref引用， 所以对其进行操作时，我们依然需要使用 ref.value的方式；


```html
<template>
  <div>
    <h2>{{ count }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>
```

ref接收的数据可以是基本数据类型也可以是对象类型

基本数据类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的

对象类型的数据：内部依靠的是v3中的一个新函数`reactive`函数（把放入的数据加工成了一个Proxy对象，具体Proxy的操作是在reactive函数里进行实现的）

```html
<template>
  <div>
    <h2>{{ info.count }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const info = ref({
  count: 0,
});
const increment = () => {
  info.value.count++;
};
</script>
```

## 二、shallowRef

[shallowReadonly](https://v3.cn.vuejs.org/api/refs-api.html#shallowref)是**浅层的**

```html
<template>
  <div>
    <h2>{{ counter.info.count }}</h2>
    <button @click="counter.info.count++">+1</button>
  </div>
</template>

<script setup>
import {  shallowRef } from "vue";
const counter = shallowRef({
  info: {
    count: 0,
  },
});
</script>
```

这样点击按钮是不会有响应式的