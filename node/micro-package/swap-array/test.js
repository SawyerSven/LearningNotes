const mocha = require("mocha");
const expect = require("chai").expect;

const swap = require("./");

let testData = [
  {
    data: [[1, 2, 3], 2, 4, [3, 2, 4], { name: 1 }, { name: 2, value: 3 }],
    swapped: [[1, 2, 3], 4, 2, [3, 2, 4], { name: 1 }, { name: 2, value: 3 }],
    swapIndex: [1, 2],
    test: "测试交换数据[Number]"
  },
  {
    data: [[1, 2, 3], 2, 4, [3, 2, 4], { name: 1 }, { name: 2, value: 3 }],
    swapped: [[3, 2, 4], 2, 4,[1, 2, 3], { name: 1 }, { name: 2, value: 3 }],
    swapIndex: [0, 3],
    test: "测试交换数据[Array]"
  },{
    data: [[1, 2, 3], 2, 4, [3, 2, 4], { name: 1 } ,{ name: 2, value: 3 }],
    swapped:  [[1, 2, 3], 2, 4, [3, 2, 4], { name: 2, value: 3 } ,{ name: 1 }],
    swapIndex: [4, 5],
    test: "测试交换数据[Object]"
  }
];

describe("测试swap", () => {
  for (let o of testData) {
    it(o.test, () => {
      expect(swap(o.data, ...o.swapIndex)).to.be.deep.equal(o.swapped);
    });
  }
});
