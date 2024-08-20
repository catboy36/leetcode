/**
 * 
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true

提示：

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board 和 word 仅由大小写英文字母组成
 

进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  // 记录每个位置是否被访问过
  const visited = new Array(m).fill(0).map(item => new Array(n).fill(false));
  // 判断访问数据是否越界
  const inArea = (x, y) => {
    return x >= 0 && x < m && y >= 0 && y < n;
  };
  // 每个点的四个方向
  const d = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const _dfs = (x, y, idx) => {
    if (idx > word.length - 1) {
      return true;
    }
    if (!inArea(x, y)) {
      return false;
    }
    if (visited[x][y] || board[x][y] !== word[idx]) {
      return false;
    }
    visited[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const x1 = x + d[i][0];
      const y1 = y + d[i][1];
      const res = _dfs(x1, y1, idx + 1);
      if (res) {
        return true;
      }
    }
    visited[x][y] = false;
    return false;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0] && _dfs(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
};
