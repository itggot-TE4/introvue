import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

fetch("http://localhost:9292/api/v1/users/login", {
  method: "post",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    username: "Linus",
    password: "123"
  })
})
  .then(res => {
    return res.json();
  })
  .then(tokenObj => {
    store.commit("todos/setToken", tokenObj.token)
  })
