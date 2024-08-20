// 手写实现instanceof

const _instanceof = (target, Fn) => {
  if ((typeof target !== 'object' && typeof Fn !== 'object') || target === null) {
    return false;
  }

  let proto = target.__proto__;
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === Fn.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
};

function myInstanceof(obj, constructor) {
  if (obj === null || typeof obj !== 'object') {
    // 注意不能用于基本类型的检查，如字符串、数字等，直接false。
    return false;
  }

  let proto = Object.getPrototypeOf(obj); // 获取其原型

  while (proto !== null) {
    // 如果原型存在
    if (proto === constructor.prototype) {
      //检查对象的原型是否与目标构造函数的原型相等。
      return true;
    }
    proto = Object.getPrototypeOf(proto); // 沿着原型链查找
  }

  return false; // 到达原型链末尾也没找到返回false
}
