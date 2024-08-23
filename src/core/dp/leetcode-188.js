/**
 * 
 * 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

 

示例 1：

输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
示例 2：

输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
 

提示：

1 <= k <= 100
1 <= prices.length <= 1000
0 <= prices[i] <= 1000

 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const n = prices.length;
  if (n < 2) {
    return 0;
  }
  // buy[i]代表第i次买入时手中利润
  const buy = new Array(k + 1).fill(-Number.MAX_SAFE_INTEGER);
  // sell[i]代表第i次卖出时手中利润
  const sell = new Array(k + 1).fill(0);
  buy[0] = -prices[0];
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      // 第j次购买后手中最大利润
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
      // 第i次卖出后手中最大利润
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }
  return sell[k];
};

// 我们用 buy[i][j] 表示对于数组 prices[0..i] 中的价格而言，进行恰好 j 笔交易，并且当前手上持有一支股票，这种情况下的最大利润；
// 用 sell[i][j] 表示恰好进行 j 笔交易，并且当前手上不持有股票，这种情况下的最大利润。
var maxProfit = function (k, prices) {
  const n = prices.length;
  if (n < 2) {
    return 0;
  }
  k = Math.min(k, Math.floor(n / 2));
  const buy = new Array(n).fill(0).map(item => new Array(k + 1).fill(0));
  const sell = new Array(n).fill(0).map(item => new Array(k + 1).fill(0));
  buy[0][0] = -prices[0];
  sell[0][0] = 0;
  for (let i = 1; i <= k; i++) {
    buy[0][i] = sell[0][i] = -Number.MAX_SAFE_INTEGER;
  }
  for (let i = 1; i < n; i++) {
    buy[i][0] = Math.max(buy[i - 1][0], sell[i - 1][0] - prices[i]);
    for (let j = 1; j <= k; j++) {
      buy[i][j] = Math.max(buy[i - 1][j], sell[i - 1][j] - prices[i]);
      sell[i][j] = Math.max(sell[i - 1][j], buy[i - 1][j - 1] + prices[i]);
    }
  }
  return Math.max(...sell[n - 1]);
};
