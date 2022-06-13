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
      "
      href="#"
      class="button w-button"
      @click="onConnect"
      >{{
        userAddress
          ? `${userAddress.slice(0, 5)}...${userAddress.slice(-5)}`
          : "Connect Metamask"
      }}
      <img src="./metamask.svg" alt="" srcset="" />
    </a>
  </div>
</template>
<script>
  export default {
    props: ["userAddress"],
  };
</script>
<style lang=""></style>
