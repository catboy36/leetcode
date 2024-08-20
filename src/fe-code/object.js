// Object.create

Object.prototype._create = function (proto) {
  const Fn = function () {};
  Fn.prototype = proto;
  return new Fn();
};
