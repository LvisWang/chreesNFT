import whiteList from "@/api/whiteList.json";

const Buffer = require("buffer/").Buffer;
import { MerkleTree } from "merkletreejs";

window.Buffer = Buffer;

export default {
  data() {
    return {
      isWhite: this.isWhite,
      whiteList: this.whiteList,
      address: this.address,
      root: "",
      proof: [],
    };
  },
  methods: {
    whiteMintMethod() {
      this.initWhiteList();
      this.initContractNeed();
    },
    initWhiteList() {
      this.whiteList = whiteList.data;
      this.isWhite = this.whiteList.includes(this.address);
    },
    initContractNeed() {
      const leaves = this.whiteList.map(x => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      this.root = tree.getHexRoot();
      this.proof = JSON.stringify(tree.getHexProof(keccak256(this.address)));
      console.log(this.address);
      console.log(this.root);
      console.log(this.proof);
    },
  },
};
