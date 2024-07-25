/**
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

 

示例 1：


输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]
示例 2：

输入：root = [1]
输出：[[1]]
示例 3：

输入：root = []
输出：[]
 

提示：

树中节点数目在范围 [0, 2000] 内
-100 <= Node.val <= 100
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function zigzagLevelOrder(root) {
  if (!root) {
    return [];
  }
  const stack = [root];
  const res = [];
  let even = false;
  while (stack.length) {
    const n = stack.length;
    const temp = [];
    for (let i = 0; i < n; i++) {
      const node = stack.shift();
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
      if (!even) {
        temp.push(node.val);
      } else {
        temp.unshift(node.val);
      }
    }
    even = !even;
    res.push(temp);
  }
  return res;
}

// [1,2,3,4,null,null,5]
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const root = new TreeNode(1);
const node1 = new TreeNode(2);
const node2 = new TreeNode(3);
const node3 = new TreeNode(4);
const node4 = new TreeNode(5);
node1.left = node3;
node2.right = node4;
root.left = node1;
root.right = node2;
