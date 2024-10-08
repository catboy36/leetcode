/**
 * 给定两个 promise 对象 promise1 和 promise2，返回一个新的 promise。promise1 和 promise2 都会被解析为一个数字。返回的 Promise 应该解析为这两个数字的和。
 

示例 1：

输入：
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
输出：7
解释：两个输入的 Promise 分别解析为值 2 和 5。返回的 Promise 应该解析为 2 + 5 = 7。返回的 Promise 解析的时间不作为判断条件。
示例 2：

输入：
promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
输出：-2
解释：两个输入的 Promise 分别解析为值 10 和 -12。返回的 Promise 应该解析为 10 + -12 = -2。
 

提示：

promise1 和 promise2 都是被解析为一个数字的 promise 对象
 */
/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function (promise1, promise2) {
  return new Promise(resolve => {
    const ans = [];
    let count = 0;
    promise1.then(res => {
      ans.push(res);
      count++;
      if (count === 2) {
        resolve(ans[0] + ans[1]);
      }
    });
    promise2.then(res => {
      ans.push(res);
      count++;
      if (count === 2) {
        resolve(ans[0] + ans[1]);
      }
    });
  });
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */
