/**
 * 
 * 中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

例如 arr = [2,3,4] 的中位数是 3 。
例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5 。
实现 MedianFinder 类:

MedianFinder() 初始化 MedianFinder 对象。

void addNum(int num) 将数据流中的整数 num 添加到数据结构中。

double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10-5 以内的答案将被接受。

示例 1：

输入
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
输出
[null, null, null, 1.5, null, 2.0]

解释
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
提示:

-105 <= num <= 105
在调用 findMedian 之前，数据结构中至少有一个元素
最多 5 * 104 次调用 addNum 和 findMedian
 */

var MedianFinder = function () {
  // length(0, k-1) = length(k, n) || length(0, k-1) = length(k, n) + 1
  // 小顶堆存储k, n
  this.minHeap = new MinHeap();
  // 大顶堆存储0, k - 1
  this.maxHeap = new MaxHeap();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  debugger;
  let maxSize = this.maxHeap.getSize();
  let minSize = this.minHeap.getSize();
  if (maxSize === 0) {
    this.maxHeap.insert(num);
  } else {
    if (this.maxHeap.peek() > num) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }
    maxSize = this.maxHeap.getSize();
    minSize = this.minHeap.getSize();
    if (maxSize - 1 > minSize) {
      const pop = this.maxHeap.deleteTop();
      this.minHeap.insert(pop);
    } else if (minSize > maxSize) {
      const pop = this.minHeap.deleteTop();
      this.maxHeap.insert(pop);
    }
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const maxSize = this.maxHeap.getSize();
  const minSize = this.minHeap.getSize();
  debugger;
  if (maxSize === minSize) {
    return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
  } else {
    return this.maxHeap.peek();
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

class MinHeap {
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
    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.shiftDown(smallest);
    }
  }

  shiftUp(index) {
    const parent = (index - 1) >> 1;
    if (parent >= 0 && this.heap[index] < this.heap[parent]) {
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

const temp = new MedianFinder();
temp.addNum(1);
temp.addNum(2);
temp.findMedian();
temp.addNum(3);
temp.findMedian();
