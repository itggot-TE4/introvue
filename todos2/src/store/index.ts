import { createStore } from "vuex";
import todos from "./modules/todos";
import auth from "./modules/auth";

export default createStore<{}>({
  strict: true,
  modules: { todos, auth }
});
