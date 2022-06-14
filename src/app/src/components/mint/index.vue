<template>
  <div>
    <a
      data-w-id="57408da1-b59b-fad3-0308-861394b4b6b8"
      class="button w-button mint"
      >MINT <font style="color: #fc6363">{{ mintAmount }}</font> Cheers</a
    >
  </div>
</template>
<script>
  export default {
    props: ["mintAmount"],
  };
</script>
<style>
  .mint {
    transform: none;
    transition: all 0.5s;
    background-color: #f9da8d;
  }
</style>
