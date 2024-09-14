/**
 * 给定你一个 循环 数组 arr 和一个整数 startIndex ，返回一个生成器对象 gen ，它从 arr 中生成值。第一次调用 gen.next() 时，它应该生成 arr[startIndex] 。每次调用 gen.next() 时，都会传入一个整数参数 jump（例如：gen.next(-3) ）。

如果 jump 是正数，则索引应该增加该值，但如果当前索引是最后一个索引，则应跳转到第一个索引。
如果 jump 是负数，则索引应减去该值的绝对值，但如果当前索引是第一个索引，则应跳转到最后一个索引。
 

示例 1：

输入：arr = [1,2,3,4,5], steps = [1,2,6], startIndex = 0
输出：[1,2,4,5]
解释：  
 const gen = cycleGenerator(arr, startIndex);
 gen.next().value;  // 1, index = startIndex = 0
 gen.next(1).value; // 2, index = 1, 0 -> 1
 gen.next(2).value; // 4, index = 3, 1 -> 2 -> 3
 gen.next(6).value; // 5, index = 4, 3 -> 4 -> 0 -> 1 -> 2 -> 3 -> 4
示例 2：

输入：arr = [10,11,12,13,14,15], steps = [1,4,0,-1,-3], startIndex = 1
输出：[11,12,10,10,15,12]
解释：
 const gen = cycleGenerator(arr, startIndex);
 gen.next().value;   // 11, index = 1
 gen.next(1).value;  // 12, index = 2
 gen.next(4).value;  // 10, index = 0
 gen.next(0).value;  // 10, index = 0
 gen.next(-1).value; // 15, index = 5
 gen.next(-3).value; // 12, index = 2
示例 3：

输入：arr = [2,4,6,7,8,10], steps = [-4,5,-3,10], startIndex = 3
输出：[7,10,8,4,10]
解释：
 const gen = cycleGenerator(arr, startIndex);
 gen.next().value   // 7,  index = 3
 gen.next(-4).value // 10, index = 5
 gen.next(5).value  // 8,  index = 4
 gen.next(-3).value // 4,  index = 1  
 gen.next(10).value // 10, index = 5
 

提示：

1 <= arr.length <= 104
1 <= steps.length <= 100
-104 <= steps[i], arr[i] <= 104
0 <= startIndex < arr.length
 */
/**
 * @param {Array<number>} arr
 * @param {number} startIndex
 * @yields {number}
 */
var cycleGenerator = function* (arr, startIndex) {
  const len = arr.length;
  while (true) {
    console.log('start>>>>', startIndex);
    const step = yield arr[startIndex];
    console.log('running>>>>', step);
    startIndex = (((startIndex + step) % len) + len) % len;
    console.log('end>>>>', startIndex);
  }
};

const gen = cycleGenerator([1, 2, 3, 4, 5], 0);
gen.next().value; // 1
gen.next(1).value; // 2
gen.next(2).value; // 4
gen.next(6).value; // 5

/**
 *  const gen = cycleGenerator([1,2,3,4,5], 0);
 *  gen.next().value  // 1
 *  gen.next(1).value // 2
 *  gen.next(2).value // 4
 *  gen.next(6).value // 5
 */
