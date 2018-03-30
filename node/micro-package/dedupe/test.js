const mocha = require("mocha");
const dedupe = require("./");
const expect = require("chai").expect;

console.log(dedupe);

const testData = [
  {
    list: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    value: [1, 2, 3, 4, 5, 6]
  },
  {
    list:[[1,2,3],[1,2,3],[1,2,4],[1,2,5]],
    value:[[1,2,3],[1,2,4],[1,2,5]]
  }
];

const testObjData = [
  {
    list:[{name:1,value:1},{name:2,value:2},{name:3,value:3},{name:1,value:2}],
    value:[{name:1,value:1},{name:2,value:2},{name:3,value:3}]
  },
]


describe("测试dedupe方法",function(){
  it("测试数组去重", () => {
     for(let i = 0;i<testData.length;i++){
      expect(dedupe(testData[i].list)).to.be.deep.equal(testData[i].value);       
     }
     for(let i = 0;i<testObjData.length;i++){
      expect(dedupe(testObjData[i].list,'value')).to.be.deep.equal(testObjData[i].value);       
     }
  });
});
