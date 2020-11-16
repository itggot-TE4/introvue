import { createStore } from "vuex";

export default createStore({
  strict: true,
  state: {
    todos: [] as object[]
  },
  mutations: {
    addTodo(state, newTodo){
      state.todos.push(newTodo)
    }
  },
  actions: {},
  modules: {}
});
