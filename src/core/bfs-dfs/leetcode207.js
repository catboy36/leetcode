/**
 * 
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

示例 1：

输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
示例 2：

输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 

提示：

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
prerequisites[i] 中的所有课程对 互不相同
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // preList[i]代表课程i的前序课程数量
  const preList = new Array(numCourses).fill(0);
  // 存每个课程的后续课程
  const map = new Map();
  const queue = [];
  prerequisites.forEach(([cur, pre]) => {
    preList[cur]++;
    map.set(pre, map.has(pre) ? [...map.get(pre), cur] : [cur]);
  });
  // 没有前序课程的课程直接入队列，其可以直接学习，只用关心其后续课程即可
  for (let i = 0; i < numCourses; i++) {
    if (preList[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    const course = queue.pop();
    if (map.has(course)) {
      // 遍历每一个课程的后续课程，每次遍历到，后续课程的前序课程减一，为0的时候，证明其没有谦虚课程，可以学习完，则入队，再去查看其后续课程情况
      for (const item of map.get(course)) {
        preList[item]--;
        if (preList[item] === 0) {
          queue.push(item);
        }
      }
    }
  }
  return preList.every(course => course === 0);
};

canFinish(8, [[1, 0]]);
