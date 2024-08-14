/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] 的值为 '0' 或 '1'
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  // 边界判断数组
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
  // 标记访问状态的数组
  const visited = new Array(m).fill(1).map(() => new Array(n).fill(false));
  let count = 0;
  // 深度优先遍历
  const _dfs = (grid, i, j) => {
    visited[i][j] = true;
    for (let k = 0; k < 4; k++) {
      const x = i + d[k][0];
      const y = j + d[k][1];
      inArea(x, y) && !visited[x][y] && grid[x][y] == 1 && _dfs(grid, x, y);
    }
    return;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] == 1) {
        count++;
        _dfs(grid, i, j);
      }
    }
  }
  return count;
};

numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]);
