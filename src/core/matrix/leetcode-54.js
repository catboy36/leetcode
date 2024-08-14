/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 *  m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const ans = [];
  let left = 0,
    top = 0,
    right = n - 1,
    bottom = m - 1;
  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      ans.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      ans.push(matrix[i][right]);
    }
    right--;
    if (left > right || top > bottom) {
      break;
    }
    for (let i = right; i >= left; i--) {
      ans.push(matrix[bottom][i]);
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      ans.push(matrix[i][left]);
    }
    left++;
  }
  return ans;
};
