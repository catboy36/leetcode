/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 链表中结点的数目为 sz
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz

进阶：你能尝试使用一趟扫描实现吗？
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 1 -> 2 -> 3 -> 4 -> 5 , n = 3
var removeNthFromEnd = function (head, n) {
  let first = head;
  for (let i = 0; i < n; i++) {
    first = first.next;
  }
  if (!first) {
    return head.next;
  }
  let second = head;
  while (first.next) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return head;
};

var removeNthFromEnd = function (head, n) {
  const arr = [head];
  for (let cur = head; cur.next; cur = cur.next) {
    arr.push(cur.next);
  }
  const len = arr.length;
  if (len <= 1) {
    return null;
  }
  if (n > 1) {
    arr[len - n].val = arr[len - n].next.val;
    arr[len - n].next = arr[len - n].next.next;
  } else {
    arr[len - n - 1].next = null;
  }
  return arr[0];
};
