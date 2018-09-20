### 1. Vue中scope原理以及穿透方法

 - 原理： Vue 通过在DOM结构以及CSS样式上添加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的。
 - 具体实现： 
    - 通过给HTML的DOM节点加一个不重复data属性(如：data-v-2311c06a)来表示他的唯一性;
    - 在每个CSS选择器的末尾加一个当前组件的data属性选择器来私有化样式

 - scope的穿透

    如果引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时需要通过

 ```html
    <style scoped>
        .a >>> .b {/* ... */}
    
    </style>
 ```

 上述代码会编译成

 ```css

    .a[data-v-f3f3eg9] .b {/* ... */}

 ```

 有些像Sass之类的预处理器无法正确解析>>>。这种情况下可以使用/deep/操作符取而代之-------这是一个>>>的别名，同样可以正常工作。

---

### 2. 手写半圆，圆，三角形，梯形

 - 主要是根据border实际上是一个梯形的原理，通过调整四个边的border宽度和盒子的宽高来实现梯形和三角形
 - 根据border-radius和宽高实现半圆和圆形。半圆的邻边的比例应该是2:1；

---

### 3. CSS3有什么特性

 - border-radius animation transition transform calc filter vw vh rem flex grid

---

### 4. 盒模型

  - 概念:盒模型由 content padding border margin组成。
  - 标准盒模型和IE盒模型： IE盒模型由content + padding + border组成宽高,标准盒模型为content的宽高。
  - 修改两种模型：通过box-sizing: content-box / border-box 
  - 边距重叠：父元素没有设置margin-top的时候，子元素设置margin-top,父元素也同时拥有边距；

---

### 5. BFC (block fomartting context,块级格式化上下文)

   - 原理:
        1. 内部的box会在垂直方向，一个接一个的放置
        2. 每个元素的margin-box左边，与包含块border-box的左边相接触(对于从左往右的格式化,否则相反)
        3. box垂直方向的距离由margin决定，属于同一个bfc的两个相邻box的margin会发生重叠
        4. bfc的区域不会与浮动区域的box重叠
        5. bfc是一个页面上独立的容器，外面的元素不会影响bfc里的元素，反之亦然
        6. 计算bfc高度的时候，浮动元素也会参与计算
    - 创建bfc:
        - 根元素或包含根元素的元素
        - 浮动元素(元素的float不是none)
        - 绝对定位元素(元素的position为absolute或fixed)
        - 行内块元素(元素的display为inline-block)
        - 表格单元格(元素的display为table-cell)
        - 表格标题(元素的display为table-caption)
        - 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
        - overflow不为visible的块元素
        - display的值为flow-root的元素
        - contain值为layout、content或strict的元素
        - 弹性元素(display为flex或inline-flex元素的直接子元素)
        - 网格元素
    - 应用场景：
        - 自适应两栏布局
        - 清楚内部浮动
        - 防止垂直margin重叠

---

