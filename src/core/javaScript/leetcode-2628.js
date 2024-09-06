/**
 * 
 * 给定两个对象 o1 和 o2 ，请你检查它们是否 完全相等 。

对于两个 完全相等 的对象，必须满足以下条件：

如果两个值都是原始类型，它们通过了 === 等式检查，则认为这两个值是 完全相等 的。
如果两个值都是数组，在它们具有相同元素且顺序相同，并且每个元素在这些条件下也 完全相等 时，认为这两个值是 完全相等 的。
如果两个值都是对象，在它们具有相同键，并且每个键关联的值在这些条件下也 完全相等 时，认为这两个值是 完全相等 的。
你可以假设这两个对象都是 JSON.parse 的输出。换句话说，它们是有效的 JSON 。

请你在不使用 lodash 的 _.isEqual() 函数的前提下解决这个问题。

 

示例 1：

输入：o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
输出：true
输入：键和值完全匹配。
示例 2：

输入：o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
输出：true
解释：尽管键的顺序不同，但它们仍然完全匹配。
示例 3：

输入：o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
输出：false
解释：数字数组不同于字符串数组。
示例 4：

输入：o1 = true, o2 = false
输出：false
解释：true !== false
 

提示：

1 <= JSON.stringify(o1).length <= 105
1 <= JSON.stringify(o2).length <= 105
maxNestingDepth <= 1000
 */
/**
 * @param {null|boolean|number|string|Array|Object} o1
 * @param {null|boolean|number|string|Array|Object} o2
 * @return {boolean}
 */
var areDeeplyEqual = function (o1, o2) {
  const type1 = Object.prototype.toString.call(o1);
  const type2 = Object.prototype.toString.call(o2);
  if (type1 !== type2) {
    return false;
  }
  if (['boolean', 'number', 'string'].includes(typeof o1) || o1 == null) {
    return o1 === o2;
  }
  if (Array.isArray(o1)) {
    if (o1.length !== o2.length) {
      return false;
    }
    for (let i = 0; i < o1.length; i++) {
      if (!areDeeplyEqual(o1[i], o2[i])) {
        return false;
      }
    }
    return true;
  } else {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
      return false;
    }
    for (const key in o1) {
      if (Object.hasOwnProperty.call(o1, key)) {
        if (!areDeeplyEqual(o1[key], o2[key])) {
          return false;
        }
      }
    }
    return true;
  }
};

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
function areDeeplyEqual(o1, o2) {
  var objs = [[o1, o2]];

  while (objs.length) {
    [o1, o2] = objs.pop();

    if (o1 === o2) continue;
    if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!(key in o2)) return false;
      objs.push([o1[key], o2[key]]);
    }
  }

  return true;
}
