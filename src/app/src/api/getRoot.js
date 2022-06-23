// root 树生成器，node环境执行
const whiteList = require("./whiteList.json");

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const leaves = whiteList.data.map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
root = tree.getHexRoot();

console.log("root tree为：", root);
