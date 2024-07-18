/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 
子数组
 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

 

示例 1：

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
示例 2：

输入：target = 4, nums = [1,4,4]
输出：1
示例 3：

输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
 

提示：

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 105
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return nums[0] >= target ? 1 : 0;
  }
  let left = 0;
  let right = 0;
  let sum = nums[0];
  let ans = Infinity;
  while (left < n && right < n) {
    if (sum < target) {
      right++;
      sum += nums[right];
    }
    // 这里条件if或while都可以
    // if (sum >= target) {
    while (sum >= target) {
      ans = Math.min(ans, right - left + 1);
      sum -= nums[left];
      left++;
    }
    if (left > right) {
      right = left;
    }
  }
  return ans === Infinity ? 0 : ans;
};

var minSubArrayLen = function (target, nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return nums[0] >= target ? 1 : 0;
  }
  let left = 0;
  let right = 0;
  let sum = 0;
  let ans = Infinity;
  // 维护滑动窗口
  while (right < n) {
    sum += nums[right];
    while (sum >= target) {
      ans = Math.min(ans, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }
  return ans === Infinity ? 0 : ans;
};
