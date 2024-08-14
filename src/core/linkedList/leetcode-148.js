/**
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 提示：

链表中节点的数目在范围 [0, 5 * 104] 内
-105 <= Node.val <= 105
 

进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if (!head) {
    return null;
  }
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  arr.sort((a, b) => a - b);
  const prev = new ListNode(null);
  let cur = prev;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return prev.next;
};

var sortList = function (head) {
  let mergeList = (left, right) => {
    let prev = new ListNode(null);
    const temp = prev;
    while (left && right) {
      if (left.val <= right.val) {
        prev.next = left;
        left = left.next;
      } else {
        prev.next = right;
        right = right.next;
      }
      prev = prev.next;
    }
    prev.next = left ? left : right;
    return temp.next;
  };
  let mergeSort = node => {
    if (!node || !node.next) return node;
    let mid = node;
    let fast = mid.next;
    while (fast && fast.next) {
      mid = mid.next;
      fast = fast.next.next;
    }
    let rightList = mid.next;
    mid.next = null;
    let leftList = node;
    return mergeList(mergeSort(leftList), mergeSort(rightList));
  };
  return mergeSort(head);
};
