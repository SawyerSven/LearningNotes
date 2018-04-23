const filter = require("./utils").filter;

const max = 100; //小于一百

let sums = {};
let products = {};

for (let i = 2; i < max; i++) {
  let x = i;
  for (let d = 0; d < max - x; d++) {
    let y = x + d;

    let p = x * y;

    products[p] = products[p] || [];
    products[p].push({ x: x, y: y });

    let s = x + y;

    sums[s] = sums[s] || [];
    sums[s].push({ x: x, y: y });
  }
}

filter(sums);
filter(products);

for (let key in sums) {
  let pairs = sums[key];
  let flag = pairs.every(pair => {
    return pair.x * pair.y in products;
  });
  if (!flag) {
    delete sums[key];
  }
}

for (let key in sums) {
  let pairs = sums[key];
  let r = pairs.filter(pair => {
    let ps = products[pair.x * pair.y];
    let r = ps.filter(p => {
      return p.x + p.y in sums;
    });
    if (r.length == 1) {
      return true;
    }
    return false;
  });
  if (r.length == 1) {
    console.log(r);
  }
}
