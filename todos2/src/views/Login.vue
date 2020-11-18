<template>
  <div class="login">
    <h1>This is a login page</h1>
    <button @click="login">login</button>
    <p>{{name}}</p>
    <p>{{failure}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Login",
  computed: {
    ...mapGetters('user', ['name']),
    ...mapGetters('auth', ['failure'])
  },
  methods: {
    login() {
      this.$store.dispatch("auth/authorize", {
        username: "Linus",
        password: "1234"
      });
    },
  },
};
</script>
