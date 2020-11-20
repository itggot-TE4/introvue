import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Todo from "@/views/Todo.vue";
import Todos from "@/views/Todos.vue";
import Login from "@/views/Login.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
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
  const token = store.getters["user/token"];

  if (store.getters["todos/numTodos"] == 0 && token) {
    store.dispatch("todos/fetchTodos");
  }

  if (!token && to.fullPath != "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
