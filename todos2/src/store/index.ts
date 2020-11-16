import { createStore } from "vuex";

export default createStore({
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
