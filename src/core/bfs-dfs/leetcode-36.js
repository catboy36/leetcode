/**
 * 
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 

注意：

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
空白格用 '.' 表示。
 

示例 1：


输入：board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：true
示例 2：

输入：board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：false
解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
 

提示：

board.length == 9
board[i].length == 9
board[i][j] 是一位数字（1-9）或者 '.'
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  // rows[i][j]代表，第i行，数字 j + 1 的使用情况
  const rows = new Array(9).fill(0).map(item => new Array(9).fill(0));
  // cols[i][j]代表，第i列，数字 j + 1 的使用情况
  const cols = new Array(9).fill(0).map(item => new Array(9).fill(0));
  // boxes[i][j][k], 代表i,j位置3 * 3宫格中(把每个三宫格看成一个整体，一共9个三宫格，分为三行三列)，的数字 k + 1在3 * 3宫格中的使用情况
  const boxes = new Array(3).fill(0).map(item => new Array(3).fill(0).map(item => new Array(9).fill(0)));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const char = board[i][j];
      if (char !== '.') {
        const index = char - 1;
        rows[i][index]++;
        cols[j][index]++;
        boxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
        if (rows[i][index] > 1 || cols[j][index] > 1 || boxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
          return false;
        }
      }
    }
  }
  return true;
};

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
  const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
  const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const c = board[i][j];
      if (c !== '.') {
        const index = c.charCodeAt() - '0'.charCodeAt() - 1;
        rows[i][index]++;
        columns[j][index]++;
        subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
        if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
          return false;
        }
      }
    }
  }
  return true;
};
