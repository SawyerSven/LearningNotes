# 你知道我们平时在CSS中写的%都是相对于谁吗？

> 原文:[掘金](https://juejin.im/post/5b0bc994f265da092918d421)

## 0.引言

在我们编写CSS的时候，经常会用到百分比赋值来实现自适应。像我们最常使用的流式布局设计模式，基本所有的column的宽度都是通过%来取值的。或者比如经常会遇到的元素水平垂直居中问题，我们常常会使用下面这样的CSS代码加以实现(absolute+transform思路):

```css

.wrap{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}

```

前面两个50%指的是wrap的定位参照物的宽、高的50%，而translate()里的50%指的是wrap自身。但在这简单的三行代码中，就出现了两类不同的%值，一种是相对于参照物盒子的，一种是相对自身的。但是CSS中还有%值的不同参照对象。

## 1. 第一类-定位类

CSS中的定位分为四种，默认值static,相对定位relative,绝对定位absolute还有固定定位fixed。虽然说每一类定位的%值的参照物都各不相同，但因为都具有定位的特殊性质，所以归为一类，现对四种不同的分类分类讨论：

- static:不存在定位功能上的%值。

- absolute：作为一个最常用的定位属性，absolute定位后可以赋予left等位置值，参照物就是祖先元素中存在定位的额元素，那么位置值的%，那么这个%相对的元素便是这个参照物。left、right是相对于width，top、bottom是相对于height。

- relative:relate也是相对于父容器宽高进行定位。(此处原文为相对于自身宽高，经测试实际上是基于父元素宽高定位)

- fixed:是一个特殊定位置，%的参照物便是视窗了。

## 2.第二类-盒模型

在一个盒模型内有很多常见的属性值:width,height,margin,border,padding。width和height是相对于父盒子，重点讲margin和padding:

- margin&padding:如果设置了%值，他们参照的是父元素的宽度!宽度！**宽度**！我们可以通过padding的这一特殊性质实现16:9或4:3等各比例响应式图片、视频盒子的构建。(通过设置宽度和padding-bottom可以构建等比盒子)

> 修正：在writing-mode为水平的时候他们的参照物是父元素的宽度，writing-mode为垂直的时候参照物则是父元素的高度

- border:目前不允许输入%值。

- border-radius:平时我们使用border-radius时赋4个值分别是左上、右上、右下、左下顺时针排序。但实际上最多可以取八个值，前四个值和后四个值用/隔开，斜杠前表示各角水平方向上的圆角半径，斜杠后表示各角竖直方向上的圆角半径。

## 3.第三类-背景值

- background-size:设置背景时常用的属性，虽然我们平时用contain或者cover代替，但是当我们想要让背景充满整个盒子的时候，也会这样子写：

```css
background-size:100% 100%;
```

因此，background-size的参照物和border-radius一样，都是盒子自身的宽高。

- background-position:这个属性和relative类似，起到的也是定位效果，因此它的参照对象就是原盒子。但是这个属性比较特殊，他不是参照原盒子的宽高值，而是原盒子的宽高减去背景图片的宽高值所得到的剩余值，更形象的说，下面这两个属性值是等价的："center center 和 50% 50%",如果你设置了后者，背景图片会自动居中，不用像定位那样还需要便宜了。

## 4.第四类-transform

- translate():transform()的参照物是自身的宽高，transformZ()赋予百分比值是无意义的，因为z-index的默认值是auto;

- transform-origin:这个属性是改变元素变形的原点，它和width还有height的特点一样。

- scale();控制元素的缩放比例，传入的一般是浮点数。

- zoom:zoom并不是transform的属性值，它是一个独立的css属性，之所以把他放在transofrm这一个模块讨论，是因为恰好它与scale()有共同的特征。它的取值既可以是浮点数，也可以是%,包括参照物，都与scale()等价。


## 5.第五类-字体

- font-size:参照父盒子大小。

- line-height:我们所说的行高也是一个很特别的属性，如果赋予不同类型的值，会有不同的特性。如果它的属性值是一个无单位的数字，那么最后的结果便是这个数字与该元素字体大小的成绩。这是我们设置line-height的首选方法。因为字体大小font-size是继承自祖代元素的，通过这个方法设置值基本不会出现异常情况。但是如果我们的值是%，最后的结果是给定的百分比乘以元素最后计算出的字体大小。

- text-indent:这个属性是用来设置首行缩进，我们最常用的是2EM。按道理来说它如果取%应该也是要相对于本身的font-size.但是偏偏很特别，如果设置%，则参照的是父元素的width(writing-mode不同不同)。

## 6.总结

以不同参照物为主线做个总结：

- 相对于父盒子：

    1. 参照父盒子的对应属性：width,height,font-size
    2. 参照父盒子的wdith(writing-mode不同参照不同):比如padding,margin,text-indent.

- 相对于盒子自身：

盒模型中的border-radius；背景中的background-size；背景中的background-position比较特殊，还记得吗，它需要减去你的背景图片的宽高，你可以联想到flex布局中的flex属性值；在transform变换中，translate()、transform-origin、scale()还有我们拓展的与transform相似的zoom属性，他们都是参照自身的；line-height行高与它的字体大小有关，所以参照的就是自身的font-size。

- 相对于定位元素：

    因为定位的性质比较特殊，所以将他单独分出一类，定位元素参照的是他的定位对象，我们都可以看作是参照他们的定位元素。