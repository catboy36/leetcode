/**
 * 编写一个所有函数都支持的方法 bindPolyfill 。当 bindPolyfill 方法被调用并传递了一个对象 obj 时，该对象将成为函数的 this 上下文。

例如，如果你有以下代码：

function f() {
  console.log('My context is ' + this.ctx);
}
f();
 它的输出是 "My context is undefined" 。然而，如果你绑定了该函数：

function f() {
  console.log('My context is ' + this.ctx);
}
const boundFunc = f.boundPolyfill({ "ctx": "My Object" })
boundFunc();
它的输出应为 "My context is My Object" 。

你可以假设传递给 bindPolyfill 方法的是一个非空对象。

请在不使用内置的 Function.bind 方法的情况下解决该问题。

 

示例 1：

输入：
fn = function f(multiplier) { 
  return this.x * multiplier; 
}
obj = {"x": 10}
inputs = [5]
输出：50
解释：
const boundFunc = f.bindPolyfill({"x": 10});
boundFunc(5); // 50
传递了一个乘数 5 作为参数。 
上下文设置为 {"x": 10}。 
将这两个数字相乘得到 50。
示例 2：

输入：
fn = function speak() { 
  return "My name is " + this.name; 
}
obj = {"name": "Kathy"}
inputs = []
输出："My name is Kathy"
解释：
const boundFunc = f.bindPolyfill({"name": "Kathy"});
boundFunc(); // "My name is Kathy"

 */

/**
 * @param {Object} obj
 * @return {Function}
 */
Function.prototype.bindPolyfill = function (obj) {
  const sb = Symbol('fn');
  obj[sb] = this;
  return function () {
    return obj[sb].apply(obj, [...arguments]);
  };
};
