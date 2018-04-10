# 30 秒 CSS 读书笔记

> [原文链接](http://caibaojian.com/30-seconds-of-css)

## 弹跳加载动画

* 使用 animate @keyframes 动画，控制三个 div 的运动，并且给三个 div 设置不同的 animate-delay 实现加载动画效果

```html
    <div class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
```

```css
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.3s;
}
```


#### 说明:

1. @keyframes定义了一个具有两种状态的动画。

2. animation-delay分别用于第二个和第三个div ，以便每个元素不会同时启动动画。

3. animation是各种动画属性的缩写属性：使用animation-name ， animation-duration ， animation-iteration-count ， animation-direction 。

## 清除浮动

**注意：只有当使用浮动来构建布局时，这才是有用的。**

```html
<div class="clearfix">
  <div class="floated">float a</div>
  <div class="floated">float b</div>
  <div class="floated">float c</div>
</div>
```
```css

.clearfix::after{
    content:'';
    display:block;
    clear:both;
}

.floated{
    float:left;
}

```

#### 说明：

- clear:both 指示元素左右两侧不能与同一块格式化上下文中较早浮动的元素相邻。


## 等宽高比

> 给定可变宽度的元素，它将确保其高度以响应的方式保持成比例。

```html

    <div class="constant-width-to-height-ratio"></div>

```
```css
.constant-width-to-height-ratio{
    background: #333;
    width: 50%;
}
.constant-width-to-height-ratio::before{
    content:'';
    padding-top: 100%;
    float: left;
}
.constant-width-to-height-ratio::after{
    content:'';
    display:block;
    clear: both;
}
```
#### 说明:

padding-top在..上::before为元素使元素的高度等于其宽度的百分比。100%因此表示元素的高度始终为100%的宽度，创建一个响应正方形。

此方法还允许内容正常放置在元素内部。

## 自定义文本选择

```html 

<p class="custom-text-selection">Select some of this text.</p>

```

```css

::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```

#### 说明

::selection 定义元素上的伪选择器，以便在选定元素时设置其中文本的样式。请注意，如果不组合任何其他选择器，则样式将在文档根级别应用于任何可选元素。


## 环形加载动画

```html
    <div class="donut"></div>
```

```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0,0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}

```

## 动态阴影

> 创建与元素背景色相同的阴影

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dynamic-shadow-parent">
        <div class="dynamic-shadow"></div>
    </div>
</body>
</html>
```
```css
.dynamic-shadow-parent{
    position: relative;
    z-index: 1;
}

.dynamic-shadow{
    position: relative;
    width: 10rem;
    height: 10rem;
    background: linear-gradient(75deg,#6d78ff,#00ffb8);
}

.dynamic-shadow::after{
    content:'';
    width: 100%;
    height: 100%;
    position: absolute;
    background: inherit;
    top: 0.5rem;
    filter:blur(0.4rem);
    opacity: .7;
    z-index: -1;
}
```

## 一像素边框

```html

   <div class="hairline-border"></div>

```

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}

@media (min-resolution: 2dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.5px;
  }
}

@media (min-resolution: 3dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.3333333px;
  }
}

@media (min-resolution: 4dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.25px;
  }
}

````

## 弹出菜单

悬停是显示交互式弹出菜单

```html
  <div class="refrence">
        <div class="popup">弹出菜单</div>
</div>
```

```css
.refrence {
  position: relative;
  width: 200px;
  height: 200px;
  background: #000;
}

.popup {
  position: absolute;
  display: none;
  left: 100%;
  width: 100px;
  height: 20px;
  background: #ff0000;
}
.refrence:hover > .popup {
    display: block;
}
```

#### 说明

- .reference:hove>.popup意味着当.reference悬停在上方时，选择具有.popup类的直接子元素并将他们的visibility更改为visible。


