/**
 * 
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]
 

提示：

1 <= nums.length <= 6
-10 <= nums[i] <= 10
nums 中的所有整数 互不相同
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const ans = [];
  const _dfs = (arr, temp) => {
    if (temp.length === nums.length) {
      ans.push(temp);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i]);
      _dfs(arr.slice(0, i).concat(arr.slice(i + 1)), [...temp]);
      temp.pop();
    }
  };
  _dfs(nums, []);
  return ans;
};

permute([1, 2, 3]);
