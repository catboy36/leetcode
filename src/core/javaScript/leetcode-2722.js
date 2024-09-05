/**
 * 现给定两个数组 arr1 和 arr2 ，返回一个新的数组 joinedArray 。两个输入数组中的每个对象都包含一个 id 字段。

joinedArray 是一个通过 id 将 arr1 和 arr2 连接而成的数组。joinedArray 的长度应为唯一值 id 的长度。返回的数组应按 id 升序 排序。

如果一个 id 存在于一个数组中但不存在于另一个数组中，则该对象应包含在结果数组中且不进行修改。

如果两个对象共享一个 id ，则它们的属性应进行合并：

如果一个键只存在于一个对象中，则该键值对应该包含在对象中。
如果一个键在两个对象中都包含，则 arr2 中的值应覆盖 arr1 中的值。
 

示例 1：

输入：
arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
], 
arr2 = [
    {"id": 3, "x": 5}
]
输出：
[
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
]
解释：没有共同的 id，因此将 arr1 与 arr2 简单地连接起来。
示例 2：

输入：
arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
], 
arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
输出：
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
解释：id 为 1 和 id 为 3 的对象在结果数组中保持不变。id 为 2 的两个对象合并在一起。arr2 中的键覆盖 arr1 中的值。
示例 3：

输入：
arr1 = [
    {"id": 1, "b": {"b": 94},"v": [4, 3], "y": 48}
]
arr2 = [
    {"id": 1, "b": {"c": 84}, "v": [1, 3]}
]
输出： [
    {"id": 1, "b": {"c": 84}, "v": [1, 3], "y": 48}
]
解释：具有 id 为 1 的对象合并在一起。对于键 "b" 和 "v" ，使用 arr2 中的值。由于键 "y" 只存在于 arr1 中，因此取 arr1 的值。
 

提示：

arr1 和 arr2 都是有效的 JSON 数组
在 arr1 和 arr2 中都有唯一的键值 id
2 <= JSON.stringify(arr1).length <= 106
2 <= JSON.stringify(arr2).length <= 106
 */
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const ids1 = arr1.map(item => item.id);
  const ids2 = arr2.map(item => item.id);
  const ids = Array.from(new Set([...ids1, ...ids2]));
  const ans = [];
  ids.forEach(id => {
    const item1 = arr1.find(ele => ele.id === id);
    const item2 = arr2.find(ele => ele.id === id);
    if (item1 && item2) {
      ans.push({ ...item1, ...item2 });
    } else if (item1) {
      ans.push({ ...item1 });
    } else if (item2) {
      ans.push({ ...item2 });
    }
  });
  ans.sort((a, b) => a.id - b.id);
  return ans;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const temp = arr1.concat(arr2);
  const map = {};

  temp.forEach(item => {
    const id = item.id;
    if (!map[id]) {
      map[id] = { ...item };
    } else {
      map[id] = { ...map[id], ...item };
    }
  });
  const ans = Object.values(map);
  ans.sort((a, b) => a.id - b.id);
  return ans;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const map = new Map();
  for (const obj of arr1) map.set(obj.id, obj);
  for (const obj of arr2) {
    if (!map.has(obj.id)) map.set(obj.id, obj);
    else {
      const prevObj = map.get(obj.id);
      for (const key of Object.keys(obj)) prevObj[key] = obj[key];
    }
  }
  const res = new Array();
  for (let key of map.keys()) res.push(map.get(key));
  return res.sort((a, b) => a.id - b.id);
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);
  let i = 0;
  let j = 0;

  const joinedArray = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i].id === arr2[j].id) {
      joinedArray.push({ ...arr1[i], ...arr2[j] });
      i++;
      j++;
      continue;
    }

    if (arr1[i].id < arr2[j].id) {
      joinedArray.push({ ...arr1[i] });
      i++;
      continue;
    }

    joinedArray.push({ ...arr2[j] });
    j++;
  }

  while (i < arr1.length) {
    joinedArray.push({ ...arr1[i] });
    i++;
  }

  while (j < arr2.length) {
    joinedArray.push({ ...arr2[j] });
    j++;
  }

  return joinedArray;
};
