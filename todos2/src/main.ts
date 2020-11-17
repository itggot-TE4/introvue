import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

store.commit("todos/setToken", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.fWoPW7BmOFoOaiFYoMbNuNjmLrSoc-74ShvCq5QacvQ")
