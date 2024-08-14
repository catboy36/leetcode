/**
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。


n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  if (n > 1) {
    for (let i = 0; i < n; i++) {
      const temp = [];
      for (let j = 0; j < n; j++) {
        temp.push(matrix[n - 1 - j][i]);
      }
      matrix.push(temp);
    }
    matrix.splice(0, n);
  }
};