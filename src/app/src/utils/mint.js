import { ethers, utils } from "ethers";

import { contractAddress, contractABI } from "./contractInfo";

export default {
  methods: {
    async guestMint() {
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Provider.getSigner();
      const Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      );
      let wei = utils.parseEther((0.0088 * 5).toString());
      const result = await Contract.mintGuset(this.address, 5, {
        gasLimit: 3000000,
        value: wei,
      });
      console.log(
        "🛠️  ~ file: whiteCheck.js ~ line 51 ~ mint ~ result",
        result,
      );
    },
  },
};
