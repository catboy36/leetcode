/**
 * 编写一个函数，接受另一个函数 fn ，并将基于回调函数的函数转换为基于 Promise 的函数。

promisify 函数接受一个函数 fn ，fn 将回调函数作为其第一个参数，并且还可以接受其他额外的参数。

promisfy 返回一个新函数，新函数会返回一个 Promise 对象。当回调函数被成功调用时，新函数返回的 Promise 对象应该使用原始函数的结果进行解析；当回调函数被调用出现错误时，返回的 Promise 对象应该被拒绝并携带错误信息。最终返回的基于 Promise 的函数应该接受额外的参数作为输入。

以下是一个可以传递给 promisify 的函数示例：

function sum(callback, a, b) {
  if (a < 0 || b < 0) {
    const err = Error('a and b must be positive');
    callback(undefined, err);
  } else {
    callback(a + b);
  }
}
这是基于 Promise 的等效代码：

async function sum(a, b) {
  if (a < 0 || b < 0) {
    throw Error('a and b must be positive');
  } else {
    return a + b;
  }
}
 

示例 1：

输入：
fn = (callback, a, b, c) => {
  return callback(a * b * c);
}
args = [1, 2, 3]
输出：{"resolved": 6}
解释：
const asyncFunc = promisify(fn);
asyncFunc(1, 2, 3).then(console.log); // 6

fn 以回调函数作为第一个参数和 args 作为其余参数进行调用。当使用 (1, 2, 3) 调用时，基于 Promise 的 fn 将解析为值 6。
示例 2：

输入：
fn = (callback, a, b, c) => {
  callback(a * b * c, "Promise Rejected");
}
args = [4, 5, 6]
输出：{"rejected": "Promise Rejected"}
解释：
const asyncFunc = promisify(fn);
asyncFunc(4, 5, 6).catch(console.log); // "Promise Rejected"

fn 以回调函数作为第一个参数和 args 作为其余参数进行调用。在回调函数的第二个参数中，接受一个错误消息，因此当调用 fn 时，Promise 被拒绝并携带回调函数中提供的错误消息。请注意，不管将什么作为回调函数的第一个参数传递都无关紧要。
 

提示：

1 <= args.length <= 100
0 <= args[i] <= 104
 */

/**
 * @param {Function} fn
 * @return {Function<Promise<number>>}
 */
var promisify = function (fn) {
  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      fn((res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }, ...args);
    });
  };
};

/**
 * const asyncFunc = promisify(callback => callback(42));
 * asyncFunc().then(console.log); // 42
 */
