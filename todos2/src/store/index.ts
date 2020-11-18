import { createStore } from "vuex";
import todos from "./modules/todos";
import auth from "./modules/auth";
import user from "./modules/user";

export default createStore<{}>({
  strict: true,
  modules: { todos, auth, user }
});
