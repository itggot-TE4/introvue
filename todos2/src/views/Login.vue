<template>
  <div class="login">
    <h1>This is a login page</h1>
    <button @click="login">login</button>
  </div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Login",
  methods: {
    login() {
      axios
        .post("http://localhost:9292/api/v1/users/login", {
          username: "Linus",
          password: "123",
        })
        .then((resp) => {
          localStorage.setItem("access_token", resp.data.token);
          console.log(jwt.decode(resp.data.token));
          this.$store.dispatch("todos/fetchTodos");
        });
    },
  },
};
</script>
