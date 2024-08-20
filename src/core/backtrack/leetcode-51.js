/**
 * 
 * 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法。

示例 2：

输入：n = 1
输出：[["Q"]]
 

提示：

1 <= n <= 9
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const ans = [];
  // 初始化棋盘
  const board = new Array(n).fill(0).map(item => new Array(n).fill('.'));
  // 是否越界，一行一行的遍历，所以只需要考虑行坐标
  const inArea = x => x >= 0 && x < n;
  // 当前列占用情况
  const col = new Array(n).fill(false);
  // 从左下到右上的对角线
  const diagonal1 = new Map();
  // 从左上到右下的对角线
  const diagonal2 = new Map();
  // 从i,j位置出发，放置皇后，将遍历过程中的一个解决方案存放在temp中
  const _dfs = (board, i, j, temp) => {
    board[i][j] = 'Q';
    col[j] = true;
    diagonal1.set(i + j, true);
    diagonal2.set(i - j, true);
    const newTemp = [...temp, board[i].join('')];
    if (newTemp.length === n) {
      ans.push(newTemp);
    } else {
      for (let c = 0; c < n; c++) {
        inArea(i + 1) &&
          !col[c] &&
          !diagonal1.get(i + 1 + c) &&
          !diagonal2.get(i + 1 - c) &&
          _dfs(board, i + 1, c, newTemp);
      }
    }
    board[i][j] = '.';
    col[j] = false;
    diagonal1.set(i + j, false);
    diagonal2.set(i - j, false);
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      _dfs(board, i, j, []);
    }
  }
  return ans;
};
