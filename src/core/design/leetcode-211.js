/**
 * 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

实现词典类 WordDictionary ：

WordDictionary() 初始化词典对象
void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。
 

示例：

输入：
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
输出：
[null,null,null,null,false,true,true,true]

解释：
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // 返回 False
wordDictionary.search("bad"); // 返回 True
wordDictionary.search(".ad"); // 返回 True
wordDictionary.search("b.."); // 返回 True
 

提示：

1 <= word.length <= 25
addWord 中的 word 由小写英文字母组成
search 中的 word 由 '.' 或小写英文字母组成
最多调用 104 次 addWord 和 search
 */

var WordDictionary = function () {
  this.dict = {};
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.dict;
  for (const char of word) {
    if (!node[char]) {
      node[char] = {};
    }
    node = node[char];
  }
  node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const dfs = (index, node) => {
    if (index === word.length) {
      return node.isEnd;
    }
    const ch = word[index];
    if (ch !== '.') {
      const child = node[ch];
      if (child && dfs(index + 1, child)) {
        return true;
      }
    } else {
      for (const char in node) {
        if (Object.hasOwnProperty.call(node, char)) {
          const child = node[char];
          if (child && dfs(index + 1, child)) {
            return true;
          }
        }
      }
    }
    return false;
  };
  return dfs(0, this.dict);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

var WordDictionary = function () {
  this.trieRoot = new TrieNode();
};

WordDictionary.prototype.addWord = function (word) {
  this.trieRoot.insert(word);
};

WordDictionary.prototype.search = function (word) {
  const dfs = (index, node) => {
    if (index === word.length) {
      return node.isEnd;
    }
    const ch = word[index];
    if (ch !== '.') {
      const child = node.children[ch.charCodeAt() - 'a'.charCodeAt()];
      if (child && dfs(index + 1, child)) {
        return true;
      }
    } else {
      for (const child of node.children) {
        if (child && dfs(index + 1, child)) {
          return true;
        }
      }
    }
    return false;
  };

  return dfs(0, this.trieRoot);
};

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(0);
    this.isEnd = false;
  }

  insert(word) {
    let node = this;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const index = ch.charCodeAt() - 'a'.charCodeAt();
      if (node.children[index] === 0) {
        node.children[index] = new TrieNode();
      }
      node = node.children[index];
    }
    node.isEnd = true;
  }

  getChildren() {
    return this.children;
  }

  isEnd() {
    return this.isEnd;
  }
}

const wordDictionary = new WordDictionary();
wordDictionary.addWord('a');
wordDictionary.addWord('a');
wordDictionary.search('.'); // 返回 False
wordDictionary.search('a'); // 返回 True
wordDictionary.search('aa'); // 返回 True
wordDictionary.search('a'); // 返回 True
wordDictionary.search('.a'); // 返回 True
wordDictionary.search('a.'); // 返回 True
