function createSleepPromise(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}

function sleep(timeout) {
  // pass value through,if used in a promise chain;
  function promiseFunction(value) {
    return createSleepPromise(timeout).then(function() {
      return value;
    });
  }
  promiseFunction.then = function() {
    var sleepPromise = createSleepPromise(timeout);
    
    return sleepPromise.then.apply(sleepPromise, arguments);
  };
  promiseFunction.catch = Promise.resolve().catch;
  
  return promiseFunction;
}

module.exports = sleep;
