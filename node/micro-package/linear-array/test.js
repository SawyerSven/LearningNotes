const mocha = require("mocha");
const expect = require("chai").expect;

const linear = require("./");

let testData = 
  {
    data:[1,2,3,4,5,['a','b','c'],[[1,2,3],[3,4,5],[6,7,8]],[{name:1},{name:1},[{name:2},{name:3}]]],
    value:[1,2,3,4,5,'a','b','c',1,2,3,3,4,5,6,7,8,{name:1},{name:1},{name:2},{name:3}],
  }

describe('数组降维',() => {
  it('降维测试结果',() => {
    expect(linear(testData.data)).to.be.deep.equal(testData.value)
  })
})