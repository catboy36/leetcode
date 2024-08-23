/**
 * 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。

两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 
子字符串
：

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
注意：a + b 意味着字符串 a 和 b 连接。

 

示例 1：


输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出：true
示例 2：

输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出：false
示例 3：

输入：s1 = "", s2 = "", s3 = ""
输出：true
 

提示：

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1、s2、和 s3 都由小写英文字母组成
 

进阶：您能否仅使用 O(s2.length) 额外的内存空间来解决它?
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  const n = s1.length,
    m = s2.length,
    k = s3.length;
  if (n + m !== k) {
    return false;
  }
  // dp[i][j] 标识s1的前i个元素和s2的前j个元素是否能组成s3的前i + j个元素
  const dp = new Array(n + 1).fill(false).map(item => new Array(m + 1).fill(false));
  dp[0][0] = true;
  // dp[i][j] = (dp[i - 1]dp[j] && s1[i - 1] === s3[i + j -1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      const p = i + j - 1;
      if (i > 0) {
        dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[p]);
      }
      if (j > 0) {
        dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[p]);
      }
    }
  }
  return dp[n][m];
};

// 滚动数组降低时间复杂度，本质上，第i行只和i-1行有关系
var isInterleave = function (s1, s2, s3) {
  const n = s1.length,
    m = s2.length,
    k = s3.length;
  if (n + m !== k) {
    return false;
  }
  // 只需要s2的前j个元素
  const dp = new Array(m + 1).fill(false);
  dp[0] = true;
  for (let i = 0; i <= n; ++i) {
    for (let j = 0; j <= m; ++j) {
      const p = i + j - 1;
    //   其实对于dp[i]而言，它只是对上一行数据有关，因此我们可以通过&其上一次的记录使用一维的方式来实现
      if (i > 0) {
        dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(p);
      }
      if (j > 0) {
        dp[j] = dp[j] || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(p));
      }
    }
  }
  return dp[m];
};

isInterleave('aabcc', 'dbbca', 'aadbbcbcac');
