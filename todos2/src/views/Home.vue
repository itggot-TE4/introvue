<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    // if logged in
    this.$router.push('todos');
  }
};
</script>
