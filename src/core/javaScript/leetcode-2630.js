/**
 * 
 * 现给定一个函数 fn ，返回该函数的一个 记忆化 版本。

一个 记忆化 的函数是一个函数，它不会被相同的输入调用两次。而是会返回一个缓存的值。

函数 fn 可以是任何函数，对它所接受的值类型没有任何限制。如果两个输入值在 JavaScript 中使用 === 运算符比较时相等，则它们被视为相同。

 

示例 1：

输入： 
getInputs = () => [[2,2],[2,2],[1,2]]
fn = function (a, b) { return a + b; }
输出：[{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
解释：
const inputs = getInputs();
const memoized = memoize(fn);
for (const arr of inputs) {
  memoized(...arr);
}

对于参数为 (2, 2) 的输入: 2 + 2 = 4，需要调用 fn() 。
对于参数为 (2, 2) 的输入: 2 + 2 = 4，这些输入之前已经出现过，因此不需要再次调用 fn()。
对于参数为 (1, 2) 的输入: 1 + 2 = 3，需要再次调用 fn()，总共调用了 2 次。
示例 2：

输入：
getInputs = () => [[{},{}],[{},{}],[{},{}]] 
fn = function (a, b) { return a + b; }
输出：[{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
解释：
将两个空对象合并总是会得到一个空对象。尽管看起来应该缓存命中并只调用一次 fn()，但是这些空对象彼此之间都不是 === 相等的。
示例 3：

输入： 
getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
fn = function (a, b) { return ({...a, ...b}); }
输出：[{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
解释：
将两个空对象合并总是会得到一个空对象。因为传入的每个对象都是相同的，所以第二个和第三个函数调用都会命中缓存。
 

提示：

1 <= inputs.length <= 105
0 <= inputs.flat().length <= 105
inputs[i][j] != NaN
 */
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const map = new Map();

  const hasKey = (key, map) => {
    let ans = false;
    map.forEach((v, k) => {
      if (k.length === key.length) {
        let flag = true;
        for (let i = 0; i < k.length; i++) {
          if (k[i] !== key[i]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          ans = true;
        }
      }
    });
    return ans;
  };
  const getKey = (key, map) => {
    let ans;
    map.forEach((v, k) => {
      if (k.length === key.length) {
        let flag = true;
        for (let i = 0; i < k.length; i++) {
          if (k[i] !== key[i]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          ans = v;
        }
      }
    });
    return ans;
  };

  return function () {
    const args = Array.from(arguments);
    if (hasKey(args, map)) {
      return getKey(args, map);
    } else {
      const ans = fn(...arguments);
      map.set(args, ans);
      return ans;
    }
  };
}

const getInputs = () => [
  [2, 2],
  [2, 2],
  [1, 2],
];
const fn = function (a, b) {
  return a + b;
};
const inputs = getInputs();
const memoized = memoize(fn);
for (const arr of inputs) {
  memoized(...arr);
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */

function memoize(fn) {
  const argMap = new Map();
  const argsMap = new Map();
  let id = 0;
  return function () {
    let key = '';
    for (const arg of arguments) {
      if (!argMap.has(arg)) {
        argMap.set(arg, id++);
      }
      key += argMap.get(arg) + '-';
    }
    if (argsMap.has(key)) {
      return argsMap.get(key);
    } else {
      const res = fn(...arguments);
      argsMap.set(key, res);
      return res;
    }
  };
}

// 题目测试用例已经针对返回结果为 undefined 的方法

// 最正规的方案应该是另外再增添一个属性 save = false 用作是否初始化的判断，改方法需要多增加一个变量save=false，用于判断查询路径的末端是否已经存在过旧值

// 但这里依旧已经杠一下官方，毕竟 js 这么灵活，堵不住的

class DictNode extends Map {
  res = DictNode;
  constructor() {
    super();
  }
}

function memoize(fn) {
  const root = new DictNode();
  return function (...args) {
    let dict = root;
    for (let item of args) {
      if (!dict.has(item)) dict.set(item, new DictNode());
      dict = dict.get(item);
    }
    if (dict.res === DictNode) {
      const res = fn(...args);
      // 这样操作其实跟野属性没有区别，更好的方法是加一个方法用于修改这个`.res`值
      dict.res = res;
      return res;
    } else {
      return dict.res;
    }
  };
}

class DictNode {
  res = undefined;
  save = false;
  map = new Map();
  weakMap = new WeakMap();
  setRes = res => {
    this.res = res;
    this.save = true;
    return res;
  };
}

const isObj = arg => {
  return typeof arg === 'function' || (typeof arg === 'object' && arg !== null);
};

function memoize(fn) {
  const root = new DictNode();
  return function (...args) {
    let dict = root,
      map;
    for (const arg of args) {
      map = isObj(arg) ? dict.weakMap : dict.map;
      if (!map.has(arg)) {
        map.set(arg, new DictNode());
      }
      dict = map.get(arg);
    }
    if (dict.save) {
      return dict.res;
    } else {
      return dict.setRes(fn(...args));
    }
  };
}
