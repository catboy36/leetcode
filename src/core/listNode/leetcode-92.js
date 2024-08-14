/**
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * 链表中节点数目为 n
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
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
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  const temp = new ListNode(0);
  temp.next = head;
  let left = temp;
  for (let i = 0; i < m - 1; i++) {
    left = left.next;
  }
  let prev = null;
  let cur = left.next;
  for (let i = 0; i < n - m + 1; i++) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  // 将 m的next指向n的next, 同时将排在m前面节点的指针next指向n
  left.next.next = cur;
  left.next = prev;
  return temp.next;
};
