
###学习文章参考链接：

> 优雅的JavaScript排序算法(ES6) 作者:[RayJune](https://github.com/rayjune)


#### 冒泡排序

通过**依次比较，交换相邻的元素大小**（按照由小到大，如果符合就不交换）。

1次循环可以得到一个最大值，n-1次循环可以排序完毕

> n - 1次循环是因为第n - 1次的时候已经找出了所有的比最小数大的数，最小的数自然就排在第一位了。


> 内部循环的判断为: n - 1 - i  是因为外部循环 i 次，数组的倒数第i个数字已经是最大的数字，所以不需要再往后遍历



##### 属性

- 稳定
- 时间复杂度 O(n2)
- 交换
- 对即将排序完成的数组进行排序O(n) 

##### 核心概念

- 利用交换，将最大的数据冒泡到最后
- 利用缓存position来优化
- 使用双向遍历来优化


##### 代码

1. 自己实现的基础版

```javascript
var list = [4, 8, 7, 6, 2, 9, 3, 1, 5];

function bubbleSort(list) {
  // 排序的趟数，最后一次不需要排序所以为list-1
  for (let i = 0; i < list.length - 1; i++) {
  // 对数组所有元素进行比较，经过i轮排序，数组倒数第i个数字已经是正确的位置，故不需要继续循环
    for (let j = 0; j < list.length - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
      }
    }
  }
  console.log(list);
}

bubbleSort(list);  // list = [1,2,3,4,5,6,7,8,9]
```

2. 第一篇文章中的基础版

```javascript

 function bubbleSort(list) {
  // 循环将i从数组最后一位开始，每次循环减少1直到i等于0
  for (let i = list.length - 1; i > 0; i--) {
    // 循环跟n-i-1相当，用j<i来控制循环的次数
    for (let j = 0; j < i; j++) {
      if (list[j] > list[j + 1]) {
        swap(list,j,j+1)
      }
    }
  }
  console.log(list);
}

bubbleSort(list); // list = [1,2,3,4,5,6,7,8,9]

```

3. 缓存pos版

> 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置
> 由于pos位置之后的记录均已交换到位，故**在进行下一趟排序时只需要扫描到pos位置**

```javascript

function bubbleSort(list) {
  let i = list.length - 1;
  while (i > 0) {
    let pos = 0;

    for (let j = 0; j < i; j++) {
      if (list[j] > list[j + 1]) {
        pos = j;
        swap(list, j, j + 1);
      }
    }
    
    i = pos;
  }
  console.log(list);
}

void bubbleSort(list); // list = [1,2,3,4,5,6,7,8,9]

```

3. 双向遍历

> 传统冒牌排序中每趟操作只能找到一个最大值或最小值
> 我们可以**在每趟排序中进行正向和反向两边冒泡**
> 一次可以得到两个最终值,从而**使外排序躺数减少了一般**

```javascript

function bubbleSort(list) {
  let start = 0;
  let end = list.length - 1;

  while (start < end) {
    for (let i = start; i < end; i++) {
      if (list[i] > list[i + 1]) {
        swap(list, i, i + 1);
      }
    }
    for (let i = end; i > start; i--) {
      if (list[i] < list[i - 1]) {
        swap(list, i - 1, i);
      }
    }
    start++;
  }
  console.log(list);
}

void bubbleSort(list); // list = [1,2,3,4,5,6,7,8,9]

```

4. 结合方式

```javascript

function bubbleSort4(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let endPos = 0;
    let startPos = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        endPos = i;
        swap(arr, i, i + 1);
      }
    }
    end = endPos;
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        startPos = i;
        swap(arr, i - 1, i);
      }
    }
    start = startPos;
  }
  console.log(arr);
}
```

- 蚂蚁金服面试题
> 能否传入第二个参数（参数为函数），来控制升序和降序？

```javascript

const swap = require('./tool')

let list = [2,5,8,4,3,1,7,9,6];

function bubbleSort(list, compareFunc) {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (compareFunc(list[j], list[j + 1]) > 0) {
        swap(list, j, j + 1);
      }
    }
  }
  console.log(list);
}

bubbleSort(list,(a,b) => a - b);


```