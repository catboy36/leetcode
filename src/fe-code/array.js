// Array.prototype.map

Array.prototype.map = function (callback) {
  const res = [];
  this.forEach((item, index, arr) => {
    res[index] = callback(item, index, arr);
  });
  return res;
};

// Array.prototype.filter

Array.prototype.filter = function (callback) {
  const res = [];
  this.forEach((item, index, arr) => {
    const flag = callback(item, index, arr);
    if (flag) {
      res.push(item);
    }
  });
  return res;
};

// Array.prototype.reduce

Array.prototype.reduce = function (callback, initial = 0) {
  let ans = initial;
  this.forEach(item => {
    ans = callback(ans, item);
  });
  return ans;
};
