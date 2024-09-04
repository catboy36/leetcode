/**
 * 给定一个数组 arr 和一个块大小 size ，返回一个 分块 的数组。

分块 的数组包含了 arr 中的原始元素，但是每个子数组的长度都是 size 。如果 arr.length 不能被 size 整除，那么最后一个子数组的长度可能小于 size 。

你可以假设该数组是 JSON.parse 的输出结果。换句话说，它是有效的JSON。

请你在不使用 lodash 的函数 _.chunk 的情况下解决这个问题。

 

示例 1：

输入：arr = [1,2,3,4,5], size = 1
输出：[[1],[2],[3],[4],[5]]
解释：数组 arr 被分割成了每个只有一个元素的子数组。
示例 2：

输入：arr = [1,9,6,3,2], size = 3
输出：[[1,9,6],[3,2]]
解释：数组 arr 被分割成了每个有三个元素的子数组。然而，第二个子数组只有两个元素。
示例 3：

输入：arr = [8,5,3,2,6], size = 6
输出：[[8,5,3,2,6]]
解释：size 大于 arr.length ，因此所有元素都在第一个子数组中。
示例 4：

输入：arr = [], size = 1
输出：[]
解释：没有元素需要分块，因此返回一个空数组。
 

提示：

arr 是一个有效的 JSON 数组
2 <= JSON.stringify(arr).length <= 105
1 <= size <= arr.length + 1

 */
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  const n = arr.length;
  if (!n) {
    return [];
  }
  if (size >= n.length) {
    return [arr];
  }
  let i = 1;
  let temp = [];
  let ans = [];
  for (const item of arr) {
    temp.push(item);
    if (i % size === 0 || i >= n) {
      ans.push([...temp]);
      temp = [];
    }
    i++;
  }
  return ans;
};

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, function (_, index) {
    return arr.slice(index * size, index * size + size);
  });
};

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size) {
  const chunkedArray = [];
  let index = 0;

  while (index < arr.length) {
    chunkedArray.push(arr.slice(index, index + size));
    index += size;
  }

  return chunkedArray;
};

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size) {
  let chunkedArray = [[]];
  let temp = [];

  for (let i = 0; i < arr.length; i = i + size) {
    for (let j = 0; j < size; j++) {
      temp[j] = arr[j + i];
      if (j + i === arr.length) {
        temp.splice(j);
        break;
      }
    }
    chunkedArray = [...chunkedArray, [...temp]];
  }

  return chunkedArray.slice(1);
};

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size) {
  return arr.reduce((chunkedArray, element) => {
    const lastChunk = chunkedArray[chunkedArray.length - 1];
    if (!lastChunk || lastChunk.length === size) {
      chunkedArray.push([element]);
    } else {
      lastChunk.push(element);
    }
    return chunkedArray;
  }, []);
};
