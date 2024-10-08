/**
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。

图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。

class Node {
    public int val;
    public List<Node> neighbors;
}
 

测试用例格式：

简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val = 2），以此类推。该图在测试用例中使用邻接列表表示。

邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。

给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。

 

示例 1：



输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：
图中有 4 个节点。
节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
示例 2：



输入：adjList = [[]]
输出：[[]]
解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
示例 3：

输入：adjList = []
输出：[]
解释：这个图是空的，它不含任何节点。
 

提示：

这张图中的节点数在 [0, 100] 之间。
1 <= Node.val <= 100
每个节点值 Node.val 都是唯一的，
图中没有重复的边，也没有自环。
图是连通图，你可以从给定节点访问到所有节点。
 */
/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */

// 广度优先遍历
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }
  const newNode = new _Node(node.val, []);
  const map = new Map();
  map.set(node.val, newNode);
  const stack = [node];
  while (stack.length) {
    const cur = stack.pop();
    const newCur = map.get(cur.val);
    cur.neighbors.forEach(neighbor => {
      let newNB = map.get(neighbor.val);
      if (!newNB) {
        newNB = new _Node(neighbor.val, []);
        map.set(neighbor.val, newNB);
        stack.push(neighbor);
      }
      newCur.neighbors.push(newNB);
    });
  }
  return newNode;
};

// 深度优先遍历
const map = new Map();
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }
  if (map.has(node)) {
    return map.get(node);
  }
  const clone = new _Node(node.val, []);
  map.set(node, clone);

  node.neighbors.forEach(neighbor => {
    clone.neighbors.push(cloneGraph(neighbor));
  });

  return clone;
};
