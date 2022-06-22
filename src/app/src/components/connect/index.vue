<template>
  <div>
    <a
      data-w-id="57408da1-b59b-fad3-0308-861394b4b6b8"
      style="transform: none;"
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
