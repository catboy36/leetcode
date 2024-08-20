/**
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

 

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 

 

提示：

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
 * 
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const len = len1 + len2;
  const res = [];
  let i = 0;
  let j = 0;
  if (!len1) {
    return len2 % 2 ? nums2[Math.floor(len2 / 2)] : (nums2[len2 / 2 - 1] + nums2[len2 / 2]) / 2;
  } else if (!len2) {
    return len1 % 2 ? nums1[Math.floor(len1 / 2)] : (nums1[len1 / 2 - 1] + nums1[len1 / 2]) / 2;
  } else {
    while (i < len1 && j < len2) {
      if (nums1[i] < nums2[j]) {
        res.push(nums1[i]);
        i++;
      } else {
        res.push(nums2[j]);
        j++;
      }
    }
    while (i < len1) {
      res.push(nums1[i]);
      i++;
    }
    while (j < len2) {
      res.push(nums2[j]);
      j++;
    }
    return len % 2 ? res[Math.floor(len / 2)] : (res[len / 2 - 1] + res[len / 2]) / 2;
  }
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const len = m + n;
  let left = -1,
    right = -1;
  let aStart = 0,
    bStart = 0;
  for (let i = 0; i <= len / 2; i++) {
    left = right;
    if (aStart < m && (bStart >= n || nums1[aStart] < nums2[bStart])) {
      right = nums1[aStart++];
    } else {
      right = nums2[bStart++];
    }
  }
  if ((len & 1) == 0) return (left + right) / 2.0;
  else return right;
};

/**
 * 二分解法
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // make sure to do binary search for shorten array
//   if (nums1.length > nums2.length) {
//     [nums1, nums2] = [nums2, nums1];
//   }
  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;
  while (low <= high) {
    const i = low + Math.floor((high - low) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    } else if (maxLeftA > minRightB) {
      high = i - 1;
    } else {
      low = low + 1;
    }
  }
};
