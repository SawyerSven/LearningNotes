function defaultComparator(a, b) {
  return a - b;
}

function checksort(array, comparator) {
  comparator = comparator || defaultComparator;

  for (var i = 1, length = array.length; i < length; i++) {
    if (comparator(array[i], array[i + 1]) > 0) return false;
  }
  return true;
};





module.exports = checksort
