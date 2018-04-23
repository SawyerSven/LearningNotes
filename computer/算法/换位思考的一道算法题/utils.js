module.exports = {
  filter: function filter(arr) {
    for (let key in arr) {
      if (arr[key].length == 1) {
        delete arr[key];
      }
    }
  }
};
