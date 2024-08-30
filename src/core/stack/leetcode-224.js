/**
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。

 

示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
 

提示：

1 <= s.length <= 3 * 105
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式
'+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
'-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
输入中不存在两个连续的操作符
每个数字和运行的计算将适合于一个有符号的 32位 整数
 */
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const n = s.length;
  let flag = 1;
  let stack = [flag];
  let sum = 0;
  let i = 0;
  while (i < n) {
    switch (s[i]) {
      case '+':
        flag = stack[stack.length - 1];
        i++;
        break;
      case '-':
        flag = -stack[stack.length - 1];
        i++;
        break;
      case '(':
        stack.push(flag);
        i++;
        break;
      case ')':
        stack.pop();
        i++;
        break;
      case ' ':
        i++;
        break;
      default:
        let num = 0;
        while (i < n && s[i] !== ' ' && Number.isInteger(+s[i])) {
          num = num * 10 + +s[i];
          i++;
        }
        sum += flag * num;
        break;
    }
  }
  return sum;
};
