/**
 * 给定一个对象或数组，判断它是否为空。

一个空对象不包含任何键值对。
一个空数组不包含任何元素。
你可以假设对象或数组是通过 JSON.parse 解析得到的。

 

示例 1：

输入：obj = {"x": 5, "y": 42}
输出：false
解释：这个对象有两个键值对，所以它不为空。
示例 2：

输入：obj = {}
输出：true
解释：这个对象没有任何键值对，所以它为空。
示例 3：

输入：obj = [null, false, 0]
输出：false
解释：这个数组有 3 个元素，所以它不为空。
 

提示：

obj 是一个有效的 JSON 对象或数组
2 <= JSON.stringify(obj).length <= 105
 

你可以在 O(1) 时间复杂度内解决这个问题吗？
 */
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  return JSON.stringify(obj).length <= 2;
};

var isEmpty = function (obj) {
  for (const _ in obj) return false;
  return true;
};

var isEmpty = function (obj) {
  return !Object.keys(obj).length;
};
