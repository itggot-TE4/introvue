import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.interceptors.request.use(
  config => {
      const token = localStorage.getItem('access_token');
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';

      console.log("am i being intercepted!?");
      return config;
  },
  error => {
      Promise.reject(error)
  });

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
