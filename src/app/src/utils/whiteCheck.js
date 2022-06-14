import whiteList from "@/api/whiteList.json";

const Buffer = require("buffer/").Buffer;
import { MerkleTree } from "merkletreejs";
import { ethers } from "ethers";

import { contractAddress, contractABI } from "./contractInfo";

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
    async whiteMintMethod() {
      this.initWhiteList(); // 初始化白名单，获取用户资格
      this.initContractNeed(); // 获取root树，proot树
      await this.whiteMint();
    },
    initWhiteList() {
      this.whiteList = whiteList.data.map(v => v.toLowerCase());
      this.isWhite = this.whiteList.includes(this.address);
    },
    initContractNeed() {
      if (!this.isWhite) return;
      const leaves = this.whiteList.map(x => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      this.root = tree.getHexRoot();
      this.proof = tree.getHexProof(keccak256(this.address));
      console.log("address", this.address);
      console.log("root", this.root);
      console.log("proof", this.proof);
    },
    async whiteMint() {
      if (!this.isWhite) return;
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Provider.getSigner();
      const Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );
      const a = await Contract.mintWhiteLists(this.address, this.proof, {
        gasLimit: 3000000,
      });
    },
  },
};
