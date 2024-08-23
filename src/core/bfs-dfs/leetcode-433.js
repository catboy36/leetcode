/**
 * 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。

假设我们需要调查从基因序列 start 变为 end 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。

例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
另有一个基因库 bank 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。（变化后的基因必须位于基因库 bank 中）

给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。

注意：起始基因序列 start 默认是有效的，但是它并不一定会出现在基因库中。

 

示例 1：

输入：start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
输出：1
示例 2：

输入：start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
输出：2
示例 3：

输入：start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
输出：3
 

提示：

start.length == 8
end.length == 8
0 <= bank.length <= 10
bank[i].length == 8
start、end 和 bank[i] 仅由字符 ['A', 'C', 'G', 'T'] 组成
 */
/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (startGene, endGene, bank) {
  const m = startGene.length;
  const n = endGene.length;
  if (m !== n || !bank.includes(endGene)) {
    return -1;
  }
  if (startGene === endGene) {
    return 0;
  }
  const genes = ['A', 'G', 'T', 'C'];
  //   缓存bank中的基因
  const bankSet = new Set(bank);
  // 记录变化过程中某个基因状态是否已经访问过了
  const visited = new Set([startGene]);
  // 结果
  let ans = 1;
  // 队列辅助缓存变化过程中生成的基因状态(bfs通常考虑使用队列辅助)
  const queue = [startGene];
  while (queue.length) {
    const q = queue.length;
    for (let i = 0; i < q; i++) {
      const cur = queue.shift();
      // 每个基因状态的每个字符和AGTC对比替换新的基因状态
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < 4; k++) {
          if (genes[k] !== cur[j]) {
            let next = [...cur];
            next[j] = genes[k];
            next = next.join('');
            // 新的基因状态在基因库存在且没有使用过
            if (!visited.has(next) && bankSet.has(next)) {
              // 基因已经变化到终点，返回步骤结果数据
              if (next === endGene) {
                return ans;
              }
              visited.add(next);
              // 新的基因序列入队
              queue.push(next);
            }
          }
        }
      }
    }
    // 每轮结束前，结果（步骤）加1
    ans++;
  }
  return -1;
};
