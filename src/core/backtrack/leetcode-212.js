/**
 * 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词 。

单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

 

示例 1：


输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
输出：["eat","oath"]
示例 2：


输入：board = [["a","b"],["c","d"]], words = ["abcb"]
输出：[]
 

提示：

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] 是一个小写英文字母
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] 由小写英文字母组成
words 中的所有字符串互不相同

 */
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const m = board.length;
  const n = board[0].length;
  // 辅助函数，点是否在矩阵内
  const inArea = (x, y) => {
    return x >= 0 && x < m && y >= 0 && y < n;
  };
  // 数据结果记录访问过程中节点是否已经被访问的状态
  const visited = new Array(m).fill(0).map(item => new Array(n).fill(false));
  // 数据结构，标识一个点相邻的四个点偏移
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const buildTrie = words => {
    const root = {};
    for (const word of words) {
      let node = root;
      for (const char of word) {
        if (!node[char]) {
          node[char] = {};
        }
        node = node[char];
      }
      node.isEnd = word;
    }
    return root;
  };

  const ans = [];

  // 深度优先遍历
  const dfs = (trie, i, j) => {
    if (trie.isEnd) {
      ans.push(trie.isEnd);
      trie.isEnd = null;
    }
    if (!inArea(i, j) || !trie[board[i][j]] || visited[i][j]) {
      return;
    }
    const temp = board[i][j];
    visited[i][j] = true;
    for (let k = 0; k < 4; k++) {
      dfs(trie[temp], i + d[k][0], j + d[k][1]);
    }
    visited[i][j] = false;
  };

  const trie = buildTrie(words);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(trie, i, j);
    }
  }
  return ans;
};
