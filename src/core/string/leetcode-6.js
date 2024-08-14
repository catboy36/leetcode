/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
 

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"
 * 
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const arr = new Array(numRows).fill(0).map(() => []);
  const n = s.length;
  //   记录遍历过程的行号和列号
  let row = 0;
  let col = 0;
  let increase = true;
  for (let i = 0; i < n; i++) {
    if (increase) {
      arr[row][col] = s[i];
      if (row < numRows - 1) {
        row++;
      } else {
        increase = false;
      }
    } else {
      if (row > 0) {
        arr[--row][++col] = s[i];
        if (row <= 0) {
          increase = true;
          row++;
        }
      }
    }
  }
  let ans = '';
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j]) {
        ans += arr[i][j];
      }
    }
  }
  return ans;
};
