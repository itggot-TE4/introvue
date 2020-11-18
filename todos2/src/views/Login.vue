<template>
  <div class="login">
    <h1>This is a login page</h1>
    <button @click="login">login</button>
    <p>{{isLoggedIn}}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
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
