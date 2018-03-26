let list = [1, 4, 2, 5, 7, 3, 6, 8, 9];

const swap = require("./tool");

function insertionSort(list) {
  for (let i = 1, len = list.length; i < len; i++) {
    const temp = list[i];
    let preIndex = i - 1;

    while (list[preIndex] > list[i]) {
      list[i] = list[preIndex];
      preIndex -= 1;
    }
    list[preIndex + 1] = temp;
  }

  console.log(list);
}

insertionSort(list);
