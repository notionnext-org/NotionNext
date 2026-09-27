# 基础教程-简单理解React和JSX
> 迁移自：[基础教程-简单理解React和JSX](https://docs.tangly1024.com/article/react-jsx)
> 发布日期：2023-7-9
> 最后编辑：2025-4-25
> 原栏目：⌨ 开发教程
> 标签：ReactJS

## 序

前端开发人员，可能听说过比较多的就是vue、angularjs、react，其中国内最主流的就是vue，这里不赘述框架的对比，感兴趣的可以在网上查阅几种技术框架的区别。

这篇文章着重介绍React的开发与传统Html开发的不同，您可以做一个简单的了解，可以避免很多开发过程中的错误。

React的JSX和普通的HTML网页开发有以下五点不同，分别是语法不同、动态渲染、组件化、数据绑定、生态系统。


### 1. 语法不同：

JSX是一种JavaScript的语法扩展，它允许在JavaScript代码中直接使用类似HTML的标记来描述UI组件。而普通的HTML则是一种独立的标记语言。

JSX代码示例：

```JavaScript
const element = &lt;div style={{backgroundColor:"black"}} className="my-class"&gt;Hello, world!&lt;/div&gt;;
```

HTML代码示例：

```JavaScript
&lt;div style="background-color:black;" class="my-class"&gt;Hello, world!&lt;/div&gt;
```


### 2. 动态渲染

在React中，可以通过JSX动态地生成UI组件，而在普通的HTML中，页面的结构是静态的，不支持动态渲染。

JSX代码示例：

```JavaScript
function App(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

ReactDOM.render(
  &lt;App name="Alice" /&gt;,
  document.getElementById('root')
);
```

HTML代码示例：

```HTML
&lt;!-- 静态HTML代码 --&gt;
&lt;h1&gt;Hello, Alice!&lt;/h1&gt;
```


### 3. 组件化

在React中，可以将UI组件拆分成小的、可复用的组件，并通过组合这些组件来构建复杂的UI。而在普通的HTML中，没有类似于组件的概念，页面的结构通常是以静态HTML文件的形式存在。

JSX代码示例：

```JavaScript
/**
 * 按钮组件
 **/
function Button(props) {
  return &lt;button onClick={props.onClick}&gt;{props.label}&lt;/button&gt;;
}
/**
 * 根结点布局
 **/
function App() {
  return (
    &lt;div&gt;
      &lt;Button label="Click me" onClick={() =&gt; alert('Clicked!')} /&gt;
    &lt;/div&gt;
  );
}

ReactDOM.render(
  &lt;App /&gt;,
  document.getElementById('root')
);
```

这个Button组件可以任意重复地在其它布局或组件中使用。

HTML代码示例：

```HTML
&lt;!-- 没有组件化的HTML代码 --&gt;
&lt;div&gt;
  &lt;button onclick="alert('Clicked!')"&gt;Click me&lt;/button&gt;
&lt;/div&gt;
```


### 4. 数据绑定

在React中，可以通过数据绑定将组件的状态与UI的展示进行关联，实现UI的自动更新。而在普通的HTML中，需要手动更新DOM节点来实现UI的更新。

JSX代码示例：

```JavaScript
/**
 * 计数器组件
 */
function Counter() {
  const [count, setCount] = useState(0);
  /**
   * 处理点击
   */
  function handleClick() {
    setCount(count + 1);
  }

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={handleClick}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}

ReactDOM.render(
  &lt;Counter /&gt;,
  document.getElementById('root')
);
```

HTML代码示例：

```HTML
&lt;!-- 没有数据绑定的HTML代码 --&gt;
&lt;div&gt;
  &lt;p id="count"&gt;Count: 0&lt;/p&gt;
  &lt;button onclick="increment()"&gt;Increment&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
function increment() {
  const countElement = document.getElementById('count');
  const count = parseInt(countElement.innerText.split(':')[1].trim());
  countElement.innerText = 'Count: ' + (count + 1);
}
&lt;/script&gt;
```


### 5. 生态系统

React拥有庞大的生态系统，包括大量的第三方库和工具，可以方便地进行组件开发、状态管理、路由控制等。而在普通的HTML开发中，可能需要手动编写大量的JavaScript代码来实现这些功能。

总之，React的JSX相比普通的HTML网页开发更加灵活、高效、易于维护，适用于构建大型、复杂的Web应用程序。

## 原文链接

https://docs.tangly1024.com/article/react-jsx
