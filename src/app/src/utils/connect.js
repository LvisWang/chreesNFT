import { ethers } from "ethers";
export default {
  data() {
    return {
      address: this.address,
    };
  },
  methods: {
    // 连接钱包
    async onConnect() {
      this.checkMetaMask() && this.checkOutNetToMain() && this.getUserAddress();
    },
    // 1.构建provider
    Provider() {
      return new ethers.providers.Web3Provider(window.ethereum);
    },
    // 2.检查metamask是否安装
    async checkMetaMask() {
      if (window.ethereum === undefined) {
        alert("MetaMask should be installed!");
        return false;
      }
      return true;
    },
    // 3.切换到主网
    async checkOutNetToMain() {
      const { ethereum } = window;
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
      } catch (e) {
        return false;
      }
      return true;
    },
    // 4.获取用户地址
    async getUserAddress() {
      [this.address] = await this.Provider().send("eth_requestAccounts", []);
    },
  },
};
