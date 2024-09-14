/**
 * 请你编写一个函数，该函数接收一个对象 obj ，并返回该对象的一个新的 不可变 版本。

不可变 对象是指不能被修改的对象，如果试图修改它，则会抛出错误。

此新对象可能产生三种类型的错误消息。

如果试图修改对象的键，则会产生以下错误消息： `Error Modifying: ${key}` 。
如果试图修改数组的索引，则会产生以下错误消息： `Error Modifying Index: ${index}` 。
如果试图调用会改变数组的方法，则会产生以下错误消息： `Error Calling Method: ${methodName}` 。你可以假设只有以下方法能够改变数组： ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'] 。
obj 是一个有效的 JSON 对象或数组，也就是说，它是 JSON.parse() 的输出结果。

请注意，应该抛出字符串字面量，而不是 Error 对象。

 

示例 1：

输入：
obj = {
  "x": 5
}
fn = (obj) => { 
  obj.x = 5;
  return obj.x;
}
输出：{"value": null, "error": "Error Modifying: x"}
解释：试图修改对象的键会导致抛出错误。请注意，是否将值设置为与之前相同的值并不重要。
示例 2：

输入： 
obj = [1, 2, 3]
fn = (arr) => { 
  arr[1] = {}; 
  return arr[2]; 
}
输出：{"value": null, "error": "Error Modifying Index: 1"}
解释：试图修改数组会导致抛出错误。
示例 3：

输入：
obj = {
  "arr": [1, 2, 3]
}
fn = (obj) => { 
  obj.arr.push(4);
  return 42;
}
输出：{ "value": null, "error": "Error Calling Method: push"}
解释：调用可能导致修改的方法会导致抛出错误。
示例 4：

输入：
obj = {
  "x": 2,
  "y": 2
}
fn = (obj) => { 
  return Object.keys(obj);
}
输出：{"value": ["x", "y"], "error": null}
解释：没有尝试进行修改，因此函数正常返回。
 

提示：

2 <= JSON.stringify(obj).length <= 105
 */
/**
 * @param {Object|Array} obj
 * @return {Object|Array} immutable obj
 */
var makeImmutable = function (obj) {
  const methods = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
  const arrayHandler = {
    set: (o, p) => {
      throw `Error Modifying Index: ${p}`;
    },
  };
  const commonHandler = {
    set: (o, p) => {
      throw `Error Modifying: ${p}`;
    },
  };
  const methodHandler = {
    apply: o => {
      throw `Error Calling Method: ${o.name}`;
    },
  };
  const addHandler = obj => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          obj[key] = addHandler(obj[key]);
        }
      }
    }
    if (Array.isArray(obj)) {
      methods.forEach(method => {
        obj[method] = new Proxy(obj[method], methodHandler);
      });
      return new Proxy(obj, arrayHandler);
    }
    return new Proxy(obj, commonHandler);
  };
  return addHandler(obj);
};

/**
 * const obj = makeImmutable({x: 5});
 * obj.x = 6; // throws "Error Modifying x"
 */
