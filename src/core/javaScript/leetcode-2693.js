/**
 * 增强所有函数，使其具有 callPolyfill 方法。该方法接受一个对象 obj 作为第一个参数，以及任意数量的附加参数。obj 成为函数的 this 上下文。附加参数将传递给该函数（即 callPolyfill 方法所属的函数）。

例如，如果有以下函数：

function tax(price, taxRate) {
  const totalCost = price * (1 + taxRate);
  console.log(`The cost of ${this.item} is ${totalCost}`);
}
调用 tax(10, 0.1) 将输出 "The cost of undefined is 11" 。这是因为 this 上下文未定义。

然而，调用 tax.callPolyfill({item: "salad"}, 10, 0.1) 将输出 "The cost of salad is 11" 。this 上下文被正确设置，函数输出了适当的结果。

请在不使用内置的 Function.call 方法的情况下解决这个问题。

 

示例 1：

输入：
fn = function add(b) {
  return this.a + b;
}
args = [{"a": 5}, 7]
输出：12
解释：
fn.callPolyfill({"a": 5}, 7); // 12
callPolyfill 将 "this" 上下文设置为 {"a": 5} ，并将 7 作为参数传递。
示例 2：

输入：
fn = function tax(price, taxRate) { 
 return `The cost of the ${this.item} is ${price * taxRate}`; 
}
args = [{"item": "burger"}, 10, 1,1]
输出："The cost of the burger is 11"
解释：callPolyfill 将 "this" 上下文设置为 {"item": "burger"} ，并将 10 和 1.1 作为附加参数传递。
 

提示：

typeof args[0] == 'object' and args[0] != null
1 <= args.length <= 100
2 <= JSON.stringify(args[0]).length <= 105

 */
/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill1 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw TypeError('Error');
  }
  let o = context == null ? globalThis : Object(context);
  const key = Symbol('key');
  o[key] = this;
  const res = o[key](...args);
  delete o[key];
  return res;
};

/**
 * function increment() { this.count++; return this.count; }
 * increment.callPolyfill({count: 1}); // 2
 */

/**
 * Object.defineProperty
 */
Function.prototype.callPolyfill = function (context, ...args) {
  context ||= window;
  // Object.defineProperty(context, 'fn', {
  //     value:this,
  //     enumerable:false
  // });
  Reflect.defineProperty(context, 'fn', {
    enumerable: false,
    writable: false,
    value: this,
  });
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

/**
 * 原型链来解决Object.keys(this)问题
 */
Function.prototype.callPolyfill = function (context, ...args) {
  context ||= window;
  context.__proto__.fn = this;
  const result = context.fn(...args);
  delete context.__proto__.fn;
  return result;
};

/**
 * proxy代理来解决Object.keys(this)问题
 */
Function.prototype.callPolyfill = function (context, ...args) {
  context ||= window;
  const fn = this;
  const proxy = new Proxy(context, {
    get(target, prop) {
      if (prop === 'fn') {
        return fn;
      }
      return Reflect.get(...arguments);
    },
  });
  return proxy['fn'](...args);
};

/**
 * 手写call的经典写法
 * 但通过不了这个测试案例function keys() { return Object.keys(this); } [{"x": 1, "y": 2}]
 */
// 这么写给context添加了可以遍历到的属性，这是不对的
Function.prototype.callPolyfill = function (context, ...args) {
  debugger;
  context ||= window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

function keys() {
  return Object.keys(this);
}
keys.callPolyfill([{ x: 1, y: 2 }]);
keys.callPolyfill1([{ x: 1, y: 2 }]);
