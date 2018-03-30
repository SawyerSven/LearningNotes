
function linearArray(array) {
  let stash = [];
  if (!isArray(array)) throw "[ERR] SwapArray expects a array as first param";
  (function linear(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!isArray(arr[i])) {
        stash.push(arr[i]);
      } else {
        linear(arr[i]);
      }
    }
  })(array);
  return stash;
}


function isArray(array) {
  let Instance = array.constructor();
  let InstanceType = Array.isArray(Instance) ? "array" : typeof Instance;
  return InstanceType === "array";
}


module.exports = linearArray;