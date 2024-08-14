/**
 * 给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。
示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
 

提示：

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeTwoLists = (head1, head2) => {
  if (!head1 || !head2) {
    return head1 ? head1 : head2;
  }
  let prev = new ListNode(null);
  let cur = prev;
  let cur1 = head1;
  let cur2 = head2;
  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      cur.next = cur1;
      cur1 = cur1.next;
    } else {
      cur.next = cur2;
      cur2 = cur2.next;
    }
    cur = cur.next;
  }
  cur.next = cur1 ? cur1 : cur2;
  return prev.next;
};

var mergeKLists = function (lists) {
  lists = lists.filter(item => !!item);
  const k = lists.length;
  if (!k) {
    return null;
  }
  let prev = null;
  for (let i = 0; i < k; i++) {
    prev = mergeTwoLists(prev, lists[i]);
  }
  return prev;
};
