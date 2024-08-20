/**
 * 
 * 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。

环形数组 意味着数组的末端将会与开头相连呈环状。形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， nums[i] 的前一个元素是 nums[(i - 1 + n) % n] 。

子数组 最多只能包含固定缓冲区 nums 中的每个元素一次。形式上，对于子数组 nums[i], nums[i + 1], ..., nums[j] ，不存在 i <= k1, k2 <= j 其中 k1 % n == k2 % n 。

示例 1：

输入：nums = [1,-2,3,-2]
输出：3
解释：从子数组 [3] 得到最大和 3
示例 2：

输入：nums = [5,-3,5]
输出：10
解释：从子数组 [5,5] 得到最大和 5 + 5 = 10
示例 3：

输入：nums = [3,-2,2,-3]
输出：3
解释：从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
 

提示：

n == nums.length
1 <= n <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104​​​​​​​
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划
var maxSubarraySumCircular = function (nums) {
  const n = nums.length;
  // 记录从左到右0到i最大子数组和(一定是以0为开头)
  const leftMax = new Array(n).fill(0);
  leftMax[0] = nums[0];
  // 遍历到i位置的0到i值的和
  let leftSum = nums[0];
  // 记录数组最大子数组和
  let res = nums[0];
  // 记录遍历过程中每一步的最大和
  let pre = nums[0];
  for (let i = 1; i < n; i++) {
    pre = Math.max(pre + nums[i], nums[i]);
    res = Math.max(res, pre);
    leftSum += nums[i];
    leftMax[i] = Math.max(leftMax[i - 1], leftSum);
  }

  let rightSum = 0;
  for (let i = n - 1; i > 0; i--) {
    rightSum += nums[i];
    res = Math.max(res, rightSum + leftMax[i - 1]);
  }
  return res;
};

// [1,-2,3,-2]

// 取反
var maxSubarraySumCircular = function (nums) {
  const n = nums.length;
  let preMin = nums[0],
    minRes = nums[0];
  let preMax = nums[0],
    maxRes = nums[0];
  let sum = nums[0];
  for (let i = 1; i < n; i++) {
    preMax = Math.max(preMax + nums[i], nums[i]);
    maxRes = Math.max(preMax, maxRes);
    preMin = Math.min(preMin + nums[i], nums[i]);
    minRes = Math.min(preMin, minRes);
    sum += nums[i];
  }
  if (maxRes < 0) {
    return maxRes;
  } else {
    return Math.max(maxRes, sum - minRes);
  }
};

// 单调队列
// 延长一倍数组，问题转换为了在一个长度为 2n 的数组上，寻找长度不超过 n 的最大子数组和。
var maxSubarraySumCircular = function (nums) {
  const n = nums.length;
  const queue = [];
  let pre = nums[0],
    res = nums[0];
  queue.push([0, pre]);
  for (let i = 1; i < 2 * n; i++) {
    while (queue.length !== 0 && queue[0][0] < i - n) {
      queue.shift();
    }
    pre += nums[i % n];
    res = Math.max(res, pre - queue[0][1]);
    while (queue.length !== 0 && queue[queue.length - 1][1] >= pre) {
      queue.pop();
    }
    queue.push([i, pre]);
  }
  return res;
};
