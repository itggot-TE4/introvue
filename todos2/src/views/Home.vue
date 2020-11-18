<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    const token = this.$store.getters['user/token'];
    if (token) {
      this.$router.push("todos");
    } else {
      this.$router.push("login");
    }
  }
};
</script>
