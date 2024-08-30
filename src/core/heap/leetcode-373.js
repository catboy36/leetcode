/**
 * 
 * 给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

 

示例 1:

输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
解释: 返回序列中的前 3 对数：
     [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
示例 2:

输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出: [1,1],[1,1]
解释: 返回序列中的前 2 对数：
     [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 

提示:

1 <= nums1.length, nums2.length <= 105
-109 <= nums1[i], nums2[i] <= 109
nums1 和 nums2 均为 升序排列
1 <= k <= 104
k <= nums1.length * nums2.length
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */

class MinHeap {
  constructor() {
    this.queue = [];
  }

  enqueue({ data, priority }) {
    this.queue.push({ data, priority });
    this.shiftUp(this.queue.length - 1);
  }

  dequeue() {
    const last = this.queue.pop();
    const data = this.peek() || last?.data;
    if (this.queue.length) {
      this.queue[0] = last;
      this.shiftDown(0);
    }
    return data;
  }

  shiftUp(index) {
    const parent = (index - 1) >> 1;
    if (parent >= 0 && this.queue[parent].priority > this.queue[index].priority) {
      [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];
      this.shiftUp(parent);
    }
  }

  shiftDown(index) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let min = index;
    if (left < this.queue.length && this.queue[left].priority < this.queue[min].priority) {
      min = left;
    }
    if (right < this.queue.length && this.queue[right].priority < this.queue[min].priority) {
      min = right;
    }
    if (min !== index) {
      [this.queue[min], this.queue[index]] = [this.queue[index], this.queue[min]];
      this.shiftDown(min);
    }
  }

  enqueueUp(arr) {
    const length = arr.length;
    if (length) {
      for (let i = 0; i < length; i++) {
        this.enqueue(arr[i]);
      }
    }
  }

  peek() {
    return this.queue[0]?.data;
  }
}

var kSmallestPairs = function (nums1, nums2, k) {
  const m = nums1.length;
  const n = nums2.length;
  const queue = new MinHeap();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      queue.enqueue({ data: [nums1[i], nums2[j]], priority: nums1[i] + nums2[j] });
    }
  }
  let ans = [];
  for (let i = 0; i < k; i++) {
    ans.push(queue.dequeue());
  }
  return ans;
};
