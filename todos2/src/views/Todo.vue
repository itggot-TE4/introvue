<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Todo",
  mounted() {
    // if logged in
    console.log(this.$route.params);
  }
};
</script>
