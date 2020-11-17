import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Todo from "@/views/Todo.vue";
import Todos from "@/views/Todos.vue";
import Login from "@/views/Login.vue";
import store from "@/store";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos
  },
  {
    path: "/todos/:id",
    name: "Todo",
    component: Todo
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (store.getters['todos/numTodos'] == 0) {
    const token = localStorage.getItem('access_token');
    if (token) {
      store.commit("todos/setToken", token);
      store.dispatch('todos/fetchTodos');
    } else {
      axios.post("http://localhost:9292/api/v1/users/login",
        {
          username: "Linus",
          password: "123"
        },
        {
          headers: {
            "content-type": "application/json"
          }
        })
        .then((resp: any) => {
          store.commit("todos/setToken", resp.data.token);
          store.dispatch('todos/fetchTodos');
        })
    }
  }

  next();
});

export default router;
