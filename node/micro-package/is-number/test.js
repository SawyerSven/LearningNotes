const isNumber = require("./");
const mocha = require("mocha");
const expect = require("chai").expect;

const testData = [
  1,2,3,4,5,6,11,2,'1231','123123',(()=>123)(),(()=>'123')()
];
const falseData = [{},[],null,'asd',undefined,NaN]

describe("测试is-number", function() {
    it(`测试inNumber方法`, function() {
    for (let o of testData) {
        expect(isNumber(o)).to.be.ok
    }
    });
    it(`测试isNumber方法(错误数据)`,() => {
      for(let f of falseData){
        expect(isNumber(f)).to.not.be.ok
      }
    })
});
