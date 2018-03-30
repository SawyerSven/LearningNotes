"use strict";
/* github原版 */
function dedupe(client, hasher) {
  hasher = hasher || JSON.stringify;

  const clone = [];
  const lookup = {};

  for (let i = 0; i < client.length; i++) {
    let elem = client[i];
    let hashed = hasher(elem);
    if (!lookup[hashed]) {
      clone.push(elem);
      lookup[hashed] = true;
    }
  }
  return clone;
}
/* 自己魔改版 */
function dedupeAttr(client, attr, hasher) {
  hasher = hasher || JSON.stringify;
  attr = attr || null;

  const clone = [];
  const lookup = {};

  for (let i = 0; i < client.length; i++) {
    let elem = client[i];
    if (!attr) {
      let hashed = hasher(elem);
      if (!lookup[hashed]) {
        clone.push(elem);
        lookup[hashed] = true;
      }
    } else {
      let hashed = hasher(elem[attr]);
      if (!lookup[hashed]) {
        clone.push(elem);
        lookup[hashed] = true;
      }
    }
  }
  return clone;
}

/* 论坛对象数组去重方案 */

function dedupeSet(list) {
  const hash = {};
  list = list.reduce((item, next) => {
    hash[next.name] ? "" : hash[next.name] = true && item.push(next);
    return item;
  }, []);
  return list;
}


module.exports = dedupeAttr;
