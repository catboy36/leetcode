/**
 * 现给定一个值，返回该值的有效 JSON 字符串。你可以假设这个值只包括字符串、整数、数组、对象、布尔值和 null。返回的字符串不能包含额外的空格。键的返回顺序应该与 Object.keys() 的顺序相同。

请你在不使用内置方法 JSON.stringify 的前提下解决这个问题。

 

示例 1：

输入：object = {"y":1,"x":2}
输出：{"y":1,"x":2}
解释：
返回该对象的 JSON 表示形式。
注意，键的返回顺序应该与 Object.keys() 的顺序相同。
示例 2：

输入：object = {"a":"str","b":-12,"c":true,"d":null}
输出：{"a":"str","b":-12,"c":true,"d":null}
解释：
JSON 的基本类型是字符串、数字型、布尔值和 null。
示例 3：

输入：object = {"key":{"a":1,"b":[{},null,"Hello"]}}
输出：{"key":{"a":1,"b":[{},null,"Hello"]}}
解释：
对象和数组可以包括其他对象和数组。
示例 4：

输入：object = true
输出：true
解释：
基本类型是有效的输入
 

提示：

value 是一个有效的 JSON 值
1 <= JSON.stringify(object).length <= 105
maxNestingLevel <= 1000
所有字符串只包含字母数字字符
 */
/**
 * @param {null|boolean|number|string|Array|Object} object
 * @return {string}
 */
var jsonStringify = function (object) {
  if (['boolean', 'number', 'string'].includes(typeof object) || object == null) {
    return String(typeof object === 'string' ? `"${object}"` : object);
  }
  if (Array.isArray(object)) {
    const obj = object.map(item => jsonStringify(item));
    return `[${obj}]`;
  }
  if (typeof object === 'object') {
    const keys = Object.keys(object);
    const keyValues = keys.map(key => `"${key}":${jsonStringify(object[key])}`);
    return `{${keyValues.join(',')}}`;
  }
};

/**
 * @param {any} object
 * @return {string}
 */
var jsonStringify = function (object) {
  switch (typeof object) {
    case 'object':
      if (Array.isArray(object)) {
        const elements = object.map(element => jsonStringify(element));
        return `[${elements.join(',')}]`;
      } else if (object) {
        const keys = Object.keys(object);
        const keyValuePairs = keys.map(key => `"${key}":${jsonStringify(object[key])}`);
        return `{${keyValuePairs.join(',')}}`;
      } else {
        return 'null';
      }
    case 'boolean':
    case 'number':
      return `${object}`;
    case 'string':
      return `"${object}"`;
    default:
      return '';
  }
};
