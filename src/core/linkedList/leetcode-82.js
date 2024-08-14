/**
 *
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
 * 
 * 链表中节点数目在范围 [0, 300] 内
-100 <= Node.val <= 100
题目数据保证链表已经按升序 排列
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
var deleteDuplicates = function (head) {
  let prev = new ListNode();
  prev.next = head; // 插入了一个虚拟的头结点以便操作
  if (!prev.next) return prev.next; // 检查链表是否为空
  let p = prev,
    f = p.next,
    b = f.next,
    flag = false;
  while (f && b) {
    if (f.val != b.val) {
      // 若前向指针f和后向指针b的值不同
      if (!flag) {
        // 若之前未发生相同数值的情况
        p = f; // 重置p指针
      } else {
        p.next = b; // 否则把p到b中的所有元素删除
      }
      flag = false; // 清空标志
    } else {
      flag = true; // 发生了值相同的情况
    }
    f = b;
    b = b.next; // 前后指针向后移动一格
  }
  if (flag) p.next = b; // 收尾处理一下
  return prev.next;
};
