/**
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

你应当 保留 两个分区中每个节点的初始相对位置。

 链表中节点的数目在范围 [0, 200] 内
-100 <= Node.val <= 100
-200 <= x <= 200
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
 * @param {number} x
 * @return {ListNode}
 */
// [1,4,3,2,5,2]
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const head = new ListNode(1);
const n1 = new ListNode(4);
const n2 = new ListNode(3);
const n3 = new ListNode(2);
const n4 = new ListNode(5);
const n5 = new ListNode(2);
head.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;

var partition = function (head, x) {
  if (!head || !head.next) {
    return head;
  }
  console.log(head);
  debugger;
  const left = new ListNode(null);
  const right = new ListNode(null);
  let cur1 = left;
  let cur2 = right;
  let cur = head;
  while (cur) {
    if (cur.val < x) {
      cur1.next = new ListNode(cur.val);
      cur1 = cur1.next;
    } else {
      cur2.next = new ListNode(cur.val);
      cur2 = cur2.next;
    }
    cur = cur.next;
  }
  cur2.next = null;
  cur1.next = right.next;
  return left.next;
};

partition(head);
