var arr = [1, 99, 999, 9999, 89888];
var list = [2, 5, 66, [22, 33, 66], 1, [98, 77]];

var res = list.reduce((pre,cur,idx,arr) => {
    return pre+idx;
},5)

console.log(res);
