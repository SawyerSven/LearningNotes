"use strict";

module.exports = function isNumber(num) {
  var type = typeof num;
  if (type === "string") {
    if (num.trim() === "") {
      return false;
    }
  }else if(type !== 'number'){
    return false;
  }
  return (num -num + 1) === 1;
}


