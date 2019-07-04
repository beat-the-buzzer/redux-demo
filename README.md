## 从create-react-app到redux-demo

##### 项目运行地址

项目运行：[https://beat-the-buzzer.github.io/redux-demo/](https://beat-the-buzzer.github.io/redux-demo/)

##### redux概述

1、What is redux ?

> UI = render(state)，但是state只存在于组件内部。当页面有很多交互，有大量的组件之间的通信，那么我们仅仅使用react是极其复杂的。所以需要一个容器，把组件的状态保存起来，使其可更新，可访问，这样，可以大大提升效率。

2、Why we use redux ? 

> React是单向数据流的，外部组件难以获取内部组件的数据，兄弟组件之间的传值也很复杂。Redux可以让复杂的事情变得简单，让简单的事情变得复杂。以下文的例子为例，我们在一个页面中有好几个组件，有的组件可以改变状态，有的组件需要去访问状态，但是状态在组件之间不能相互传递。或者，我们不使用redux，自己去实现下文的例子，自己感受一下。

3、How to use redux ？

> 通过一个小例子来展示一下redux

##### redux相关概念介绍

1、存储状态的地方——store

> store存在于顶层组件，类似于全局变量、静态变量、本地存储的概念，意思是：状态树存在这个地方，欢迎所有组件随时访问；我们使用createStore来创建store，用combineReducers来把多个store整合在一起；

2、 改变状态树的方法——dispatch & action & reducer

> action是行为的抽象；它是一个普通的js对象；由方法生成；必须有一个type；
> reducer是响应的抽象；传入的参数是当前state和action；它是一个纯方法；传入旧的state和action，返回一个新的状态；
> dispatch是动作的执行，类似于“投”篮的这个动作；

3、组件内访问和改变状态树——mapStateToProps & mapDispatchToProps

> 我们知道，组件间的传值使用的是props，mapStateToProps和mapDispatchToProps这两个方法，顾名思义，就是把状态树和改变状态树的方法作为组件的props，这样就可以达到访问、改变状态树的目的；

4、状态树和组件之间友谊的小船——connect
> connect是一个高阶函数，用于连接状态树和组件，一般我们这么使用：

```js
connect(mapStateToProps,mapDispatchToProps)(ComponentName)
```

##### 例子实现的小目标

一个输入框，可以输入文本，点击上方按钮可以把刚刚输入的文本作为待办项展示在页面上；待办项左侧可以选择状态；待办项右侧可以删除这一项；下方是筛选条件，可以筛选出符合条件的待办项。

![](https://raw.githubusercontent.com/beat-the-buzzer/pictures/master/redux-demo/redux-demo1.jpg)

上图是《深入浅出React和Redux》这本书里面demo的运行结果，我这个项目比这个demo还要简单一点，只有添加和显示两个功能。

##### Get Started!

1、create-react-app

这是人人都能使用的react项目，首先执行命令：

```shell
create-react-app redux-demo
```
就会生成相应的项目文件，我们首先把目光放在package.json文件中。这里没有redux相关的依赖项，我们需要自己去安装

```shell
cd redux-demo
npm install redux --save
npm install react-redux --save
```

命令执行完成之后，发现package.json里面的dependencies多了两行。这样，以后在运行代码的时候，直接npm install,redux也会被安装。后面会说什么时候使用redux，什么时候使用react-redux

2、目录结构设计

进入src文件夹，把这个文件夹下index.js以外的文件全部干掉。进入index.js，很显然，我们把index.js作为了项目的入口文件。

我们知道，现在的项目都是模块化的，也就是说，一个功能模块的代码应该放在一起，而不是像以前那样，html、css、js同类相聚。我们做的功能是待办项列表的添加、显示，所以相关的代码可以放在同一个目录下。我们在src下新建文件夹todo,很显然，todo是一个功能模块，我们一般给这个功能模块设置一个入口，一般取名为view.js。

我们对redux也已经有了一个初步的了解，我们知道，action和reducer是redux的重要组成部分，我们新建两个文件：action.js和reducer.js，放在todo目录下。

redux有action，reducer，还有一个就是store，store一般都是位于顶层组件，这样，所有的组件都能访问到store，所以，store.js位于src目录下。

大致结构如图所示：

![](https://raw.githubusercontent.com/beat-the-buzzer/pictures/master/redux-demo/redux-demo4.png)

3、Provider & store

index.js中，Provider组件包裹着所有组件，并且把store作为props，这样可以让所有子组件都能访问到store。Provider组件来自于react-redux：

```jsx
ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>, 
  document.getElementById('root')
);
```

4、store & reducer & createStore & combineReducers

store.js里面应该要有什么呢？答案是：需要保存的状态树。如何改变状态树？答案是：reducer。也就是说，状态树是从reducer里面来的。所以，我们在store.js中，需要引入的文件是，所有reducer.js，然后使用createStore方法，，顾名思义，创建store。如果一个项目有多个reducer，就使用combineReducers方法，把多个reducer结合在一起。这里的createStore、combineReducers，都是来自于redux。

```js
const store = createStore(todos);
```
5、action & reducer

这两个文件是redux中最重要的。

action.js:
 
 - action是行为的抽象；
 - 它是一个普通的js对象；
 - 由方法生成
 - 必须有一个type

```js
let num = 0;
const addTodo = (text) => {
  return {
    type:'ADD_TODO',
    id:num ++,
    text
  }
}
```
reducer.js:

 - reducer是响应的抽象
 - 它是一个纯方法(不依赖外部变量)
 - 传入旧的state和action，返回一个新的状态

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: false,
        }
      ];
    default :
      return state;
  }
}
```

其实，状态树的设计就是从reducer里面开始的，初始化state是一个空数组，说明store里面存的状态树，就是一个数组，数组元素的结构，就是在'ADD_TODO'里面决定的，数组的每个元素都是一个对象。

6、view.js

view.js没什么内容，只有组件引入。这里有一点我想说一下：一般这样的无状态组件都是用纯函数来写的，但是在实际开发中，你认为的无状态组件突然需要有状态，所以一般情况下，我先用class的方式来写，等到开发完成了，就使用eslint来找出那些需要改成纯函数的组件。

7、mapDispatchToProps & connect

mapDispatchToProps，是把Dispatch作为组件的props,因为，dispatch一个action，是改变状态树的唯一办法。mapDispatchToProps可以把dispatch作为改变状态树的接口函数。当然，也可以这样写：

```js
const { dispatch } = this.props;
```

我第一次见到这样的代码的时候也很困惑，实际上是因为使用了connect方法，才使得dispatch成为了组件的props。

当然，我使用的是mapDispatchToProps，就不需要像上面那样写了。具体的代码可以查看AddTodo.js

8、mapStateToProps

mapStateToProps，是把状态树作为组件的props，这样就可以在this.props里面访问了。我们在TodoList.js中，需要显示状态树里面的数据。这个数据一旦改变，TodoList组件也会刷新。这样，AddTodo.js里面改变了状态树，TodoList.js里面访问了状态树，这两个组件没有父子关系，却能和谐地使用同一个state。

在最后，我要回答一下上面曾经提到的一个问题：redux和react-redux有什么区别？其实，回头看一下代码，答案很明显了。redux和react-redux在3个地方调用到了：index.js、store.js以及使用到connect方法的组件。我们很清楚地看到，所有和react组件相关的，调用的都是react-redux，例如，Provider组件包裹其他组件，connect方法连接组件和状态树；但是和react组件没关系的，调用的都是redux。

其他问题：使用connect的时候，为什么要这样：

```js
export default connect(null,mapDispatchToProps)(AddTodo);
```

其实，这只是我的个人喜好，因为一个组件使用redux，只有“访问状态树”和“改变状态树”这两种操作，我留一个null，正是虚位以待。

参考地址：

	https://github.com/mocheng/react-and-redux

参考书籍：

	《深入浅出React和Redux》

项目运行：[https://beat-the-buzzer.github.io/redux-demo/](https://beat-the-buzzer.github.io/redux-demo/)

更新部分：使用装饰器语法

	npm install babel-plugin-transform-decorators-legacy -D

找到`node_modules/babel-preset-react-app/index.js`，然后加入装饰器支持;接着在对应的package.json下边加入babel-plugin-transform-decorators-legacy。

```jsx
class MyComponent extends React.Component {};
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component {};
```


