---
title: customRef
---

创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制：
- 它需要一个工厂函数，该函数接受 track 和 trigger 函数作为参数；
- 并且应该返回一个带有 get 和 set 的对象；

这里我们来使用官方列举到的一个案例（通过[customRef](https://v3.cn.vuejs.org/api/refs-api.html#customref)实现防抖函数）

```html title="App.vue"
<template>
  <div>
    <input type="text" v-model="message" />
    <h2>{{ message }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useDebounce from "./useDebounce";
const message = useDebounce("", 2000, true);
</script>

<style lang="scss" scoped></style>
```

```js title="useDebounce.js"
import { customRef } from 'vue'

export default function (value, delay, Immediately = false) {
  let timer = null
  let invoke = false
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 收集依赖
        return value
      },
      set(newValue) {
        if (timer) clearTimeout(timer)
        // 第一次立即执行
        if (Immediately && !invoke) {
          value = newValue
          trigger()
          invoke = true
        }
        timer = setTimeout(() => {
          value = newValue
          trigger() // 更新触发
        }, delay);
      }
    }
  })
}
```
