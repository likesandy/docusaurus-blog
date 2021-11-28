---
title: setup函数
---

## 一、setup函数的参数

我们先来研究一个setup函数的参数，它主要有两个参数：
- 第一个参数：props
- 第二个参数：context

props非常好理解，它其实就是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可
以直接通过props参数获取：
- 对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义；
- 并且在template中依然是可以正常去使用props中的属性
- 如果我们在setup函数中想要使用props，那么不可以通过 this 去获取
- 因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可；

另外一个参数是context，我们也称之为是一个SetupContext，它里面包含三个属性：
- attrs：所有的非prop的attribute；
- slots：父组件传递过来的插槽
- emit：当我们组件内部需要发出事件时会用到emit

```js
setup(props, context) {
  console.log(props);
  console.log(context.attrs)
  console.log(context.slots)
  console.log(context.emit)
},
```

## 二、setup函数的返回值

setup既然是一个函数，那么它也可以有返回值，它的返回值用来做什么呢？
- setup的返回值可以在**模板template中被使用**；
- 也就是说我们可以**通过setup的返回值来替代data选项**；

甚至是我们可以返回一个执行函数来代替在methods中定义的方法：

```js
setup() {
  let count = 0;
  const increment = () => {
    count++
  }
  const decrement = () => {
    count--
  }
  return {
    count,
    increment,
    decrement
  };
},
```

但是，如果我们将 counter 在 increment 或者 decrement进行操作时，是否可以实现界面的响应式呢？
- 答案是**不可以**；
- 这是因为对于一个**定义的变量**来说，默认情况下，**Vue并不会跟踪它的变化，来引起界面的响应式操作**；

## 三、setup不可以使用this

官方关于this有这样一段[描述](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9)
- 表达的含义是**this并没有指向当前组件实例**；
- 并且**在setup被调用之前，data、computed、methods**等都没有被解析；
- 所以**无法在setup中获取this**；

## 四、setup语法糖

`script setup`也是v3让开发者体验更爽的一个比较好的更新


要使用这个语法，需要将 setup attribute 添加到script代码块上：

```js
<script setup>

</script>
```

使用setup语法糖之后，我们也需要return一个对象了，它会自动帮我们返回给template进行使用

在 `script setup `中必须使用 `defineProps` 和 `defineEmits` API 来声明 props 和 emits ，它们具备完整的类型推断并且在 `script setup `中是直接可用的：

```js
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

还有一个比较好的更新是，使用setup语法糖以后，我们导入组件不再需要在components里面进行添加了

更多细节请点击[详情](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6-script-setup)