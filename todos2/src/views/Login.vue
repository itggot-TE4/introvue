<template>
  <div class="login">
    <h1>This is a login page</h1>
    <button @click="login">login</button>
    <p>{{user}}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    user() {
      return this.$store.getters['user/name']
    }
  },
  methods: {
    login() {
      this.$store.dispatch("auth/authorize", {
        username: "Linus",
        password: "123"
      });
    },
  },
};
</script>
