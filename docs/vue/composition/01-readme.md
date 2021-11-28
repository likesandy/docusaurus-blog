---
id: composition
title: 前言
---

## 一、Options API的弊端

在Vue2中，我们编写组件的方式是Options API：
- Options API的一大特点就是在**对应的属性**中编写**对应的功能模块**；
- 比如data定义数据、methods中定义方法、computed中定义计算属性、watch中监听属性改变，也包括生命
周期钩子；

但是这种代码有一个很大的弊端：
- 当我们实现某一个功能时，这个功能对应的代码逻辑会被拆分到各个属性中；
- 当我们组件变得更大、更复杂时，逻辑关注点的列表就会增长，那么同一个功能的逻辑就会被拆分的很分散；
- 尤其对于那些一开始没有编写这些组件的人来说，这个组件的代码是难以阅读和理解的（阅读组件的其他人）；

下面我们来看一个非常大的组件，其中的逻辑功能按照颜色进行了划分：
- 这种碎片化的代码使用理解和维护这个复杂的组件变得异常困难，并且隐藏了潜在的逻辑问题；
- 并且当我们处理单个逻辑关注点时，需要不断的跳到相应的代码块中；

## 二、认识Composition API

如果我们能将同一个逻辑关注
点相关的代码收集在一起会更
好。

这就是Composition API想
要做的事情，以及可以帮助我
们完成的事情。

也有人把Vue Composition
API简称为`VCA`。

那么既然知道Composition API想要帮助我们做什么事情，接下来看一下到底是怎么做呢？
- 为了开始使用Composition API，我们需要有一个可以实际使用它（编写代码）的地方；
- 在Vue组件中，这个位置就是 `setup 函数`；

setup其实就是组件的另外一个选项：
- 只不过这个选项强大到我们可以用它来替代之前所编写的大部分其他选项；
- 比如methods、computed、watch、data、生命周期等等；

我们直接通过一个计数器的案例来看看Options API和Composition API

```js
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>
```

```js
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    return {
      count,
      increment,
      decrement,
    };
  },
};
```

诶？你这怎么比v2的代码还多啊，感觉不怎么样啊！

不急，下面听我慢慢讲解，看完了以后你肯定会爱不释手

