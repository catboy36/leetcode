/**
 * 给定一个数组 arr 和一个函数 fn，返回一个排序后的数组 sortedArr。你可以假设 fn 只返回数字，并且这些数字决定了 sortedArr 的排序顺序。sortedArr 必须按照 fn 的输出值 升序 排序。

你可以假设对于给定的数组，fn 不会返回重复的数字。

 

示例 1：

输入：arr = [5, 4, 1, 2, 3], fn = (x) => x
输出：[1, 2, 3, 4, 5]
解释：fn 只是返回传入的数字，因此数组按升序排序。
示例 2：

输入：arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x
输出：[{"x": -1}, {"x": 0}, {"x": 1}]
解释：fn 返回 "x" 键的值，因此数组根据该值排序。
示例 3：

输入：arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1]
输出：[[10, 1], [5, 2], [3, 4]]
解释：数组按照索引为 1 处的数字升序排序。
 

提示：

arr 是一个有效的 JSON 数组
fn 是一个函数，返回一个数字
1 <= arr.length <= 5 * 105
 */
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  return arr.sort((a, b) => fn(a) - fn(b));
};

var sortBy = function (arr, fn) {
  function swap(a, b) {
    return fn(a) < fn(b) ? -1 : 1;
  }

  return arr.sort(swap);
};
