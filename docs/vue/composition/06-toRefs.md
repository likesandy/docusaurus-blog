---
title: toRefs API
---

## 一、toRefs

如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive
返回的state对象，**数据都不再是响应式**的：

```js
let { name, age } = reactive({
  name: "tao",
  age: 18,
});
```

那么有没有办法让我们解构出来的属性是响应式的呢？
- Vue为我们提供了一个[toRefs](https://v3.cn.vuejs.org/api/refs-api.html#torefs)的函数，可以将reactive返回的对象中的属性都转成ref；
- 那么我们再次进行结构出来的 name 和 age 本身都是 ref的；

```js
import { reactive, toRefs } from "vue";
const info = reactive({
  name: "tao",
  age: 18,
});
let { name, age } = toRefs(info);
```

这种做法相当于已经在info和name,age之间建立了 链接，任何一个修改都会引起另外一个变化；

## 二、toRef

如果我们只希望转换一个reactive对象中的属性为ref, 那么可以使用[toRef](https://v3.cn.vuejs.org/api/refs-api.html#torefs)的方法：

```js
import { toRef } from 'vue'
const age = toRef(info, "age");
```