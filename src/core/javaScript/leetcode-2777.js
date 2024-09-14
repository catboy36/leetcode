/**
 * 现给定起始日期 start 、结束日期 end 和正整数 step ，返回一个生成器对象，该生成器对象按照从 start 到 end（包括 start 和 end ）的范围生成日期。

step 的值表示连续生成的日期之间的天数间隔。

所有日期都以字符串格式 YYYY-MM-DD 表示。

 

示例 1：

输入：start = "2023-04-01", end = "2023-04-04", step = 1
输出：["2023-04-01","2023-04-02","2023-04-03","2023-04-04"]
解释：
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-01'
g.next().value // '2023-04-02'
g.next().value // '2023-04-03'
g.next().value // '2023-04-04'
示例 2：

输入：start = "2023-04-10", end = "2023-04-20", step = 3
输出：["2023-04-10","2023-04-13","2023-04-16","2023-04-19"]
解释：
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-10'
g.next().value // '2023-04-13'
g.next().value // '2023-04-16'
g.next().value // '2023-04-19'
示例 3：

输入：start = "2023-04-10", end = "2023-04-10", step = 1
输出：["2023-04-10"]
解释：
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-10'
 

提示：

new Date(start) <= new Date(end)
start 和 end 的日期格式是 YYYY-MM-DD
0 <= 结束日期与开始日期之间的天数差 <= 1500
1 <= step <= 1000

 */
/**
 * @param {string} start
 * @param {string} end
 * @param {number} step
 * @yields {string}
 */
var dateRangeGenerator = function* (start, end, step) {
  let startTime = new Date(start).getTime();
  let endTime = new Date(end).getTime();
  while (startTime <= endTime) {
    const t = new Date(startTime);
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    yield `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
    startTime += step * 24 * 60 * 60 * 1000;
  }
};

/**
 * const g = dateRangeGenerator('2023-04-01', '2023-04-04', 1);
 * g.next().value; // '2023-04-01'
 * g.next().value; // '2023-04-02'
 * g.next().value; // '2023-04-03'
 * g.next().value; // '2023-04-04'
 * g.next().done; // true
 */

var dateRangeGenerator = function* (start, end, step) {
  const date = new Date(start),
    endTime = new Date(end);
  const addTime = 24 * 60 * 60 * 1000 * step;
  while (date <= endTime) {
    yield date.toISOString().split('T')[0];
    date.setTime(date.getTime() + addTime);
  }
  return;
};
