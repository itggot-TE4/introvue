<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.$router.push("todos");
    } else {
      this.$router.push("login");
    }
  }
};
</script>
