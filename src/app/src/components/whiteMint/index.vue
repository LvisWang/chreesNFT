<template>
  <div>
    <a
      data-w-id="57408da1-b59b-fad3-0308-861394b4b6b8"
      style="
        -webkit-transform: translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0)
          rotateY(0) rotateZ(0) skew(0, 0);
        -moz-transform: translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0)
          rotateY(0) rotateZ(0) skew(0, 0);
        -ms-transform: translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0)
          rotateY(0) rotateZ(0) skew(0, 0);
        transform: translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0)
          rotateZ(0) skew(0, 0);
        background-color: #fc6363;
      "
      href="#"
      class="button w-button"
      @click="whiteMint"
      >WhiteLists MINT</a
    >
    {{ userAddress }}
  </div>
</template>
<script>
  import { ethers } from "ethers";
  import ConnectTool from "../../utils/connect.vue";
  /*   import Connect from ""; */
  export default {
    mixins: [ConnectTool],
    data() {
      return {
        address: "",
      };
    },
    methods: {
      async whiteMint() {
        await this.onConnect();
      },
    },
  };
</script>
<style lang=""></style>
