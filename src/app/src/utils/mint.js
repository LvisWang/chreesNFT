import { ethers, utils } from "ethers";

import { contractAddress, contractABI } from "./contractInfo";

export default {
  data() {
    return {
      amount: this.amount,
    };
  },
  methods: {
    async guestMint() {
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Provider.getSigner();
      const Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      let wei = utils.parseEther((0.0088 * this.amount).toString());
      await Contract.mintGuest(this.address, this.amount, {
        gasLimit: 3000000,
        value: wei,
      });
    },
  },
};
