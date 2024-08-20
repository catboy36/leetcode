/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]
 

提示：

1 <= n <= 20
1 <= k <= n
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const ans = [];
  // 从arr数组中取m个数，放到temp数组中
  const _dfs = (arr, m, temp) => {
    if (m === 0) {
      ans.push(temp);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i]);
      _dfs(arr.slice(i + 1), m - 1, [...temp]);
      temp.pop();
    }
  };
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  _dfs(arr, k, []);
  return ans;
};
