/**
 * 给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。

 

示例 1：

输入：left = 5, right = 7
输出：4
示例 2：

输入：left = 0, right = 0
输出：0
示例 3：

输入：left = 1, right = 2147483647
输出：0
 

提示：

0 <= left <= right <= 231 - 1
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function (m, n) {
  // 由于按位与操作的特点是，遇0都为0，因此在位运算累加时，后位会慢慢归0，只剩前缀
  // 因此，只需要找到前缀并还原即可
  let offset = 0;
  while (m !== n) {
    m >>= 1;
    n >>= 1;
    offset++;
  }
  return m << offset;
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// Brian Kernighan 算法,用于清除二进制串中最右边的 1
// Brian Kernighan 算法的关键在于我们每次对 number 和 number−1 之间进行按位与运算后，number 中最右边的 1 会被抹去变成 0。
var rangeBitwiseAnd = function (m, n) {
  while (m < n) {
    n &= n - 1;
  }
  return n;
};
