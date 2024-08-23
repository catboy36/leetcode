/**
 * 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。

 

示例 1：

输入:a = "11", b = "1"
输出："100"
示例 2：

输入：a = "1010", b = "1011"
输出："10101"
 

提示：

1 <= a.length, b.length <= 104
a 和 b 仅由字符 '0' 或 '1' 组成
字符串如果不是 "0" ，就不含前导零
 * 
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let ans = '';
  let ca = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = ca;
    sum += i >= 0 ? parseInt(a[i]) : 0;
    sum += j >= 0 ? parseInt(b[j]) : 0;
    ans += sum % 2;
    ca = Math.floor(sum / 2);
  }
  ans += ca == 1 ? ca : '';
  return ans.split('').reverse().join('');
};
