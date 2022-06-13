<script>
import { ethers } from 'ethers'
import { addressContract, addressABI } from './contract.js';

export default {
    data() {
        return {
            addressUser: "",
          //要花费的最大数据？？
            configContract: {
                gasLimit: 250000,
            }
        }
    },
    created() {
        this.checkoutLogin()
    },
    methods: {
        async checkoutLogin() {
            const { ethereum } = window

            if (ethereum === undefined) {
                alert("请安装metamask钱包，并导入私钥")
                return false
            }
            [this.addressUser] = await this.Provider().send("eth_requestAccounts", [])
            return true
        },
        Provider() {
            return new ethers.providers.Web3Provider(window.ethereum);
        },
        Contract() {
            const provider = this.Provider()
            const signer = provider.getSigner()
            const Contract = new ethers.Contract(addressContract, addressABI, signer)
            return Contract
        },
      //查询的遍历
        async hundredData(asyncFn) {
            let tmp = []
            for (let i = 1000; i < 1100; i++) {
                await asyncFn(i).then(res => {
                    tmp.push(res)
                })
            }
            return tmp
        },
    },
}
</script>
