/**
 * 
 * 假设 力扣（LeetCode）即将开始 IPO 。为了以更高的价格将股票卖给风险投资公司，力扣 希望在 IPO 之前开展一些项目以增加其资本。 由于资源有限，它只能在 IPO 之前完成最多 k 个不同的项目。帮助 力扣 设计完成最多 k 个不同项目后得到最大总资本的方式。

给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。

最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。

总而言之，从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。

答案保证在 32 位有符号整数范围内。

 

示例 1：

输入：k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
输出：4
解释：
由于你的初始资本为 0，你仅可以从 0 号项目开始。
在完成后，你将获得 1 的利润，你的总资本将变为 1。
此时你可以选择开始 1 号或 2 号项目。
由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。
示例 2：

输入：k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
输出：6
 

提示：

1 <= k <= 105
0 <= w <= 109
n == profits.length
n == capital.length
1 <= n <= 105
0 <= profits[i] <= 104
0 <= capital[i] <= 109

 */
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
// k = 2, w = 0, profits = [3,40,50,80], capital = [0,0,1,1]
var findMaximizedCapital = function (k, w, profits, capital) {
  const n = profits.length;
  const heap = new MaxHeap();
  // 已完成的项目数量
  let count = 0;
  const arr = profits.map((item, index) => [capital[index], item]);
  arr.sort((a, b) => a[0] - b[0]);
  let i = 0;
  while (count < k) {
    while (i < n && arr[i][0] <= w) {
      heap.insert(arr[i++][1]);
    }
    if (heap.getSize()) {
      w += heap.deleteTop();
    } else {
      break;
    }
    count++;
  }
  return w;
};

class MaxHeap {
  constructor() {
    this.heap = [];
    this.count = 0;
  }

  heapify(data) {
    const length = data.length;
    if (length) {
      for (let i = 0; i < length; i++) {
        this.insert(data[i]);
      }
    }
  }

  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
    this.count++;
  }

  shiftDown(index) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let smallest = index;
    if (left < this.heap.length && this.heap[left] > this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] > this.heap[smallest]) {
      smallest = right;
    }
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.shiftDown(smallest);
    }
  }

  shiftUp(index) {
    const parent = (index - 1) >> 1;
    if (parent >= 0 && this.heap[index] > this.heap[parent]) {
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      this.shiftUp(parent);
    }
  }

  deleteTop() {
    this.count > 0 && this.count--;
    const top = this.peek();
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.shiftDown(0);
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }

  getSize() {
    return this.count;
  }
}
