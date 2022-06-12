// Keccak-256：产生256位哈希，目前由Ethereum使用。
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

// 白名单地址
const addresses = [
  "0xeD2827f8f76892320e73f90e4D49Ebf8a0Af7c43",
  "0x1071258E2C706fFc9A32a5369d4094d11D4392Ec",
  "0x25f7fF7917555132eDD3294626D105eA1C797250",
  "0xF6574D878f99D94896Da75B6762fc935F34C1300",
  "0xfDbAb374ee0FC0EA0D7e7A60917ac01365010bFe",
  "0xfB73f8B1DcD5d61D4dDC3872dA53200B8562F243",
  "0x95F6E4C94857f605b9A73c9163D5c94AAf849c40",
  "0xEd2C82417256DF74a995213713A586E07d3e5255",
  "0xCb14d0D43BB32705fAbbD863f860A1410fa14613",
  "0x7a865e44988a2ebcad845E977db07C71f8c62d31",
  "0x340F5bEcB63a33B53959026d0CEb1f83C53A102F",
  "0x969560dBBf4872049D0d245791eD74dEd0D66578",
  "0x81B8888dfbdcc3Ad1dfe30A6f58a6d47eaf99aE8",
  "0x29aB6E246c4aC305974A730B10459417FF65D469",
  "0x2B790Dd5d9440f098E057E4958e3Ac0214712352",
  "0xA53E16be846D815dfF774A384858021952b5B22E",
  "0x04473648f6BeA9b074DFd7693b20AFCF9971a125",
  "0xc26716b827c0d207AA3D25667028C2da1De787bf",
  "0x21BAa9441e2DF389Ca27c9dB1cD9B59f2504dfEa",
  "0x93D5193694a49eB85366ea1BDa69B577f1b878ae",
  "0x3654322cFecCD60965A8b7866f50e55FE14EEBCC",
  "0x174BAFfcB004ACfc53cDD3A48957b9D353BB171f",
  "0x1d9A510DfCa2b1f3C52BD81122816FD86C7C7Ba0",
  "0x55ae457519BbAf25d825772da81F57bD18E4B6Db",
  "0x0997680928431EA22C1930c12Dc91f06d10be0c6",
  "0xF9E8383bd1250aCf18Da971467B70045d4D06fB1",
  "0x847aB63F94e931F9264407C54C97DbCfFEC9f8FE",
  "0x5dcE9Fc14eED67D046A130d1d991163114b2820c",
  "0x53b5585AA42b79B0b8e620896ceB0D0435441071",
  "0x5E661e550Fcac43DEC925449A7F0bCA0C32D6A44",
  "0xA46f327d91282aFD4E99d79a8fD7Eac7A123dAF5",
  "0xD03241a89a18c779B71f1bD348d2BbF1e20b8ea8",
  "0x4D15f921A25e8677Da2d878B01c80Df861E67F03",
  "0x98d450BfbBFD64D780B632f6acd0FC59d11E575e",
  "0xaef0FfA370108915d4198Fe6eF40eBa446f00d79",
  "0x5Bc46cf525E6E26f8799685E5247a93355354cBf",
  "0x5B9837c339F7b55564Aeb185e8DEdeEDD10AfcB7",
];

// 通过hash生成叶子，返回二进制格式（buffer）
const leaves = addresses.map(x => keccak256(x));

// MerkleTree 运算
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

const root = tree.getHexRoot();

// 用户地址
let leaf = addresses[0];

// 获取到 proof
let proof = tree.getHexProof(keccak256(leaf));
// 确认结果
const verify = tree.verify(proof, keccak256(leaf), tree.getRoot());

// buffer 转换成 16进制
const buf2hex = x => {
  return "0x" + x.toString("hex");
};
// buffer 转换成 16进制，在合约 isValid 验证白名单
let inputRemixLeaf = buf2hex(keccak256(addresses[0]));

console.log("🛠️  verify", verify);
console.log("🛠️  leaf", leaf);
console.log("🛠️  root", root);
console.log("🛠️  proof", JSON.stringify(proof));

