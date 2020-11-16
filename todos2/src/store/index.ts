import { createStore } from "vuex";
import todos, { TodosState } from "./modules/todos";

export default createStore<TodosState>({
  strict: true,
  modules: { todos }
});
