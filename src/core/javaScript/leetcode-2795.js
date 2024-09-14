/**
 * 给定一个数组 functions，返回一个 promise 对象 promise。functions 是一个返回多个 promise 对象 fnPromise 的函数数组。每个 fnPromise 可以被解析（resolved）或拒绝（rejected）。

如果 fnPromise 被解析：

    obj = { status: "fulfilled", value: resolved value}

如果 fnPromise 被拒绝：

    obj = { status: "rejected", reason: 拒绝的原因（捕获的错误消息）}

该 promise 应该返回一个包含这些对象 obj 的数组。数组中的每个 obj 应该对应原始函数数组中的多个 promise 对象，并保持相同的顺序。

请在不使用内置方法 Promise.allSettled() 的情况下实现它。

 

示例 1：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
输出：{"t":100,"values":[{"status":"fulfilled","value":15}]}
解释：
const time = performance.now()
const promise = promiseAllSettled(functions);
               
promise.then(res => {
    const out = {t: Math.floor(performance.now() - time), values: res}
    console.log(out) // {"t":100,"values":[{"status":"fulfilled","value":15}]}
})

返回的 promise 在 100 毫秒内解析。由于函数数组中的 promise 被解析，返回的 promise 的解析值设置为[{"status":"fulfilled","value":15}]。
示例 2：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(20), 100)), 
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
输出：
{
    "t":100,
    "values": [
        {"status":"fulfilled","value":20},
        {"status":"fulfilled","value":15}
    ]
}
解释：返回的 promise 在 100 毫秒内解析，因为解析时间取决于需要最长时间来解析的 promise。由于函数数组中的 promises 被解析，返回的 promise 的解析值设置为[{"status":"fulfilled","value":20},{"status":"fulfilled","value":15}]。
示例 3：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(30), 200)), 
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
输出：
{
    "t":200,
    "values": [
        {"status":"fulfilled","value":30},
        {"status":"rejected","reason":"Error"}
    ]
}
解释：返回的 promise 在 200 毫秒内解析，因为解析时间取决于需要最长时间来解析的 promise。由于函数数组中的一个 promise 被解析，另一个被拒绝，返回的 promise 的解析值设置为[{"status":"fulfilled","value":30},{"status":"rejected","reason":"Error"}]。数组中的每个对象对应原始函数数组中的 promise，并保持相同的顺序。
 

提示：

1 <= functions.length <= 10
 */
/**
 * @param {Array<Function>} functions
 * @return {Promise<Array>}
 */
var promiseAllSettled = function (functions) {
  return new Promise((res, rej) => {
    let all = [];
    let count = 0;
    functions.forEach((func, idx) => {
      func()
        .then(v => {
          all[idx] = {
            status: 'fulfilled',
            value: v,
          };
          count++;
          if (count === functions.length) {
            res(all);
          }
        })
        .catch(e => {
          all[idx] = {
            status: 'rejected',
            reason: e,
          };
          count++;
          if (count === functions.length) {
            res(all);
          }
        });
    });
  });
};

/**
 * const functions = [
 *    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
 * ]
 * const time = performance.now()
 *
 * const promise = promiseAllSettled(functions);
 *
 * promise.then(res => {
 *     const out = {t: Math.floor(performance.now() - time), values: res}
 *     console.log(out) // {"t":100,"values":[{"status":"fulfilled","value":15}]}
 * })
 */
