/**
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' 组成，捕获 所有 被围绕的区域：

连接：一个单元格与水平或垂直方向上相邻的单元格连接。
区域：连接所有 'O' 的单元格来形成一个区域。
围绕：如果您可以用 'X' 单元格 连接这个区域，并且区域中没有任何单元格位于 board 边缘，则该区域被 'X' 单元格围绕。
通过将输入矩阵 board 中的所有 'O' 替换为 'X' 来 捕获被围绕的区域。

 

示例 1：

输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

解释：


在上图中，底部的区域没有被捕获，因为它在 board 的边缘并且不能被围绕。

示例 2：

输入：board = [["X"]]

输出：[["X"]]

 

提示：

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] 为 'X' 或 'O'
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const m = board.length;
  const n = board[0].length;

  const inArea = (x, y) => x >= 0 && x < m && y >= 0 && y < n;
  const _dfs = (i, j) => {
    if (!inArea(i, j)) {
      return;
    }
    if (board[i][j] === 'O') {
      board[i][j] = 'XO';
      _dfs(i + 1, j);
      _dfs(i, j + 1);
      _dfs(i - 1, j);
      _dfs(i, j - 1);
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O' && (i === 0 || i === m - 1 || j === 0 || j === n - 1)) {
        _dfs(i, j);
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      } else if (board[i][j] === 'XO') {
        board[i][j] = 'O';
      }
    }
  }
};
