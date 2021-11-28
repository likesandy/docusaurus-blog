---
title: watchEffect
---

当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 [watchEffect](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect)。

watchEffect会自动收集响应式的依赖(回调函数中用到了什么响应式属性就会监听对应的响应式属性)

```js
<script setup>
import { ref, watchEffect } from "vue";
const count = ref(0);
watchEffect(() => {
  console.log("count", count.value);
});
</script>
```

首先，watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖；

其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行；

如果在发生某些情况下，我们希望停止侦听，这个时候我们可以获取watchEffect的返回值函数，调用该函数即可。

```js
const stop = watchEffect(() => {
  console.log("count", count.value);
});
const btnClick = () => {
  count.value++;
  if (count.value >= 5) {
    stop();
  }
};
```

watchEffect也是可以清除副作用的

什么是清除副作用呢？
- 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，
或者侦听器侦听函数被再次执行了。
- 那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用；

在我们给watchEffect传入的函数被回调时，其实可以获取到一个参数：onInvalidate
- 当**副作用即将重新执行** 或者 **侦听器被停止** 时会执行该函数传入的回调函数；
- 我们可以在传入的回调函数中，执行一些清楚工作；

```js
const stop = watchEffect((onInvalidate) => {
  console.log("count", count.value);
  const timer = setTimeout(() => {
    console.log("发送网络请求");
  }, 2000);
  onInvalidate(() => {
    // 在整个函数中清除额外的副作用
    // 在组件销毁的时候也会回调一次
    // 可以理解为侦听器再次执行的时候先执行这个函数（清除副作用），然后再执行onInvalidate外面的代码
    clearTimeout(timer);
  });
});
```

这里再说一个东西，在setup中如何使用ref或者元素或者组件？

其实非常简单，我们只需要定义一个ref对象，绑定到元素或者组件的ref属性上即可；

```js
const title = ref(null);
watchEffect(() => {
  console.log(title.value);
});
```

我们会发现打印结果打印了两次：
- 这是因为setup函数在执行时就会立即执行传入的副作用函数，这个时候DOM并没有挂载，所以打印为null；
- 而当DOM挂载时，会给title的ref对象赋值新的值，副作用函数会再次执行，打印出来对应的元素；

如果我们希望在第一次的时候就打印出来对应的元素呢？
- 这个时候我们需要改变副作用函数的执行时机；
- 它的默认值是pre，它会在元素 挂载 或者 更新 之前执行；
- 所以我们会先打印出来一个空的，当依赖的title发生改变时，就会再次执行一次，打印出元素；

我们可以设置副作用函数的执行时机（watchEffect的第二个参数）

```js
watchEffect(
  () => {
    console.log(title.value);
  },
  { flush: "post" }
);
```

:::info
flush 选项还接受 sync，这将强制效果始终同步触发。然而，这是**低效**的，应该很少需要。
:::