---
title: computed
---

在Composition API中，我们可以在 setup 函数中使用 [computed](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed) 方法来编写一个计算属性；

如何使用computed呢？
- 接收一个getter函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；
- 接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象；

```js
import { computed, ref } from "vue";
const firstName = ref("Hello");
const lastName = ref("World");
const fullName = computed(() => firstName.value + " " + lastName.value);
```

```js
const fullName = computed({
  get: () => firstName.value + " " + lastName.value,
});
```