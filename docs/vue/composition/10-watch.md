---
title: watch
---

[watch](https://v3.cn.vuejs.org/api/computed-watch-api.html#watch)的API完全等同于组件watch选项的Property：
- watch需要侦听特定的数据源，并在回调函数中执行副作用；
- 默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调；

与watchEffect的比较，watch允许我们：
- 懒执行副作用（第一次不会直接执行）；
- 更具体的说明当哪些状态发生变化时，触发侦听器的执行；
- 访问侦听状态变化前后的值；

watch侦听函数的数据源有两种类型：
- 一个getter函数：但是该getter函数必须引用可响应式的对象（比如reactive或者ref）；
- 直接写入一个可响应式的对象，reactive或者ref（比较常用的是ref）；


```js
const counter = reactive({
  count: 0,
});
const count = ref(0);
// 情况一：一个getter函数
// reactive对象
watch(
  () => counter.count,
  (newValue, oldValue) => {
    console.log("newValue", newValue, "oldValue", oldValue);
  }
);
// ref对象
watch(
  () => count,
  (newValue, oldValue) => {
    console.log("newValue", newValue, "oldValue", oldValue);
  }
);
```

```js
// 情况二:一个响应式对象
const counter = reactive({
  count: 0,
});
const count = ref(0);
// reactive对象
watch(counter, (newValue, oldValue) => {
  // 拿到的结果是一个proxy对象
  console.log("newValue", newValue, "oldValue", oldValue);
});
// ref对象
watch(count, (newValue, oldValue) => {
  console.log("newValue", newValue, "oldValue", oldValue);
});
```

侦听器还可以使用数组同时侦听多个源：

```js
const name = ref("tao");
const age = reactive({
  age: 18,
});
watch([name, age], ([newName, newAge], [oldName, oldAge]) => {
  console.log(newName, newAge, oldName, oldAge);
});
```
如果我们希望侦听一个深层的侦听，那么依然需要设置 deep 为true：

```js
// reactive默认就是一个深度侦听
// ref的话就不是一个深度侦听，需要设置一个deep为true
// immediate的话就是第一次就执行（跟v2是一样的）
watch(
  info,
  (newValue, oldValue) => {
    console.log("newValue", newValue, "oldValue", oldValue);
  },
  { deep: true, immediate: true }
);
```

