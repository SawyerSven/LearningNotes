"use strict";

function inArray(arr, val) {
  console.time("测试时间");
  arr = arr || [];
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i] = val)) {
      console.timeEnd("测试时间");
      return true;
    }
  }
  console.timeEnd("测试时间");
  return false;
}

function getInclude(arr, val) {
  console.time("indexOf时间");
  if (arr.indexOf(val) > -1) {
  console.timeEnd("indexOf时间");
  return true;
  } else {
  console.timeEnd("indexOf时间");
  return false;
  }
}

getInclude([1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h',77,88,99,98,96,11,12,13,14,15,16,17],17)
inArray([1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h',77,88,99,98,96,11,12,13,14,15,16,17],17);
