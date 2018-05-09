const expect = require("chai").expect;
const space = require("./");

const strings = {
  camel: "thisIsAString",
  constant: "THIS_IS_A_STRING",
  dot: "this.is.a.string",
  pascal: "ThisIsAString",
  sentence: "This is a string.",
  snake: "this_is_a_string",
  space: "this is a string",
  title: "This Is a String",
  junk: "-this__is$%a-string..."
};

describe('to-space-case',function(){
  for(var key in strings) test(key)
})

function test(key) {
  it(`should convert ${key} case`, function() {
    expect(space(strings[key])).to.be.equal("this is a string");
  });
}
