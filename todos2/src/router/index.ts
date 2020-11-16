import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Todo from "@/views/Todo.vue";
import Todos from "@/views/Todos.vue";
import Login from "@/views/Login.vue";
import store, {Todo as ITodo} from "@/store";

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
  if (store.state.todos.length == 0) {
    fetch("http://localhost:9292/api/v1/todos", {
      method: "get",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(todos => {
        todos.forEach((todo : ITodo) => {
          store.commit('addTodo', todo);
        });
      })
      .finally(() => next());
  } else next();
})

export default router;
