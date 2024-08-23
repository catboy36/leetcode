/**
 * 
 * 给你一个字符串 s，找到 s 中最长的 
回文
 
子串
。

 

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成
 */
/**
 * @param {string} s
 * @return {string}
 */

// 动态规划法
var longestPalindrome = function (s) {
  const n = s.length;
  if (n < 2) {
    return s;
  }
  let left = 0,
    right = 0,
    res = 0;
  // 状态转移方程dp[i][j]代表i到j范围的字符串是否是回文串
  const dp = new Array(n).fill(false).map(item => new Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        if (res < j - i) {
          res = j - i;
          left = i;
          right = j;
        }
      }
    }
  }
  return s.substring(left, right + 1);
};

// 中心扩散法
const expandAroundCenter = (str, left, right) => {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++;
  }
  return right - left - 1;
};

var longestPalindrome = function (s) {
  const n = s.length;
  if (n < 2) {
    return s;
  }
  let left = 0,
    right = 0;
  for (let i = 0; i < n; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > right - left) {
      left = i - Math.floor((len - 1) / 2);
      right = i + Math.floor(len / 2);
    }
  }
  return s.substring(left, right + 1);
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const n = s.length;
  if (n < 2) {
    return s;
  }
  let ans = '';
  for (let i = 0; i < n; i++) {
    // 奇数长度回文
    helper(s, i, i);
    // 偶数长度回文
    helper(s, i, i + 1);
  }
  function helper(s, i, j) {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      i--;
      j++;
    }
    if (j - i - 1 > ans.length) {
      ans = s.substring(i + 1, j);
    }
  }
  return ans;
};
