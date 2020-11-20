<template>
  <div class="login">
    <h1>This is a login page</h1>
    <button @click="login">login</button>
    <!-- TODO: show logout button if signed in -->
    <p>{{ name }}</p>
    <!-- TODO: show loading -->
    <p>{{ failure }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters("user", ["name"]),
    ...mapGetters("auth", ["failure"])
  },
  methods: {
    login() {
      // TODO: add real user inputs
      this.$store.dispatch("auth/authorize", {
        username: "Linus",
        password: "123"
      });
    }
  }
};
</script>
