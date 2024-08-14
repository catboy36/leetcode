/**
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表 intervals，其中 intervals[i] = [starti, endi] 表示第 i 个区间的开始和结束，并且 intervals 按照 starti 升序排列。同样给定一个区间 newInterval = [start, end] 表示另一个区间的开始和结束。

在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。

返回插入之后的 intervals。

注意 你不需要原地修改 intervals。你可以创建一个新数组然后返回它。

 

示例 1：

输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
示例 2：

输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 

提示：

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals 根据 starti 按 升序 排列
newInterval.length == 2
0 <= start <= end <= 105
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const n = intervals.length;
  if (!n) {
    return [newInterval];
  }
  let start = newInterval[0];
  let end = newInterval[1];
  let added = false;
  const ans = [];
  for (let i = 0; i < n; i++) {
    if (intervals[i][1] < start) {
      ans.push(intervals[i]);
    } else if (intervals[i][0] > end) {
      if (!added) {
        ans.push([start, end]);
        added = true;
      }
      ans.push(intervals[i]);
    } else {
      start = Math.min(start, intervals[i][0]);
      end = Math.max(end, intervals[i][1]);
    }
  }
  if (!added) {
    ans.push([start, end]);
  }
  return ans;
};
