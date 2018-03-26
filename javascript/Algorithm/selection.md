
###学习文章参考链接：

> 优雅的JavaScript排序算法(ES6) 作者:[RayJune](https://github.com/rayjune)


### 选择排序

**每次内循环遍历寻找最小的数**，记录下minIndex,并在这次内循环结束后交换minIndex和i的位置.

重复这样的循环n-1次即得到结果。

#### 属性

- 不稳定
> 假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，ri=rj,且ri在rj之前，而在排序后的序列中，ri扔在rj之前，则称这种排序算法是稳定的，否则是不稳定的。

- O(n2) 无论为什么输入，均为O(n2)
- O(n) 交换：注意，这里只有n次的交换，选择排序的唯一优点

> Selection sort has the property of minimizing the number of swaps. In applications where the cost of swapping items is high, selection sort very well may be the algorithm of choice.

> 选择排序在具有使交换次数最小化的特性，在某些交换成本较高的应用中，选择排序可能是非常好的算法

**最慢的选择排序，也有它的用武之地**


#### 核心概念

- 可预测的时间复杂度，什么进来都是O(n2),但不稳定，唯一的优点是减少了swap次数。

#### 代码实现

```javascript

let list = [1, 4, 2, 5, 7, 6, 8, 9, 3];

const swap = require("./tool");

function selectSort(list) {
  console.time('选择排序耗时');
  for (let i = 0; i < list.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[minIndex]) {
        minIndex = j;
      }
    }
    swap(list, i, minIndex);
  }
  console.log(list);
  console.timeEnd('选择排序耗时')
}

selectSort(list);

```