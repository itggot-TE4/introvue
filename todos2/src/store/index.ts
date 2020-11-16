import { createStore } from "vuex";

interface Todo {
  id: number,
  title: string,
  description: string,
  isCompleted: boolean
}

export default createStore({
  strict: true,
  state: {
    todos: [] as Todo[]
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todos.push(newTodo)
    },
    delTodo(state, id) {
      state.todos = state.todos.filter(f => f.id !== id)
    },
    toggleCompleted(state, id) {
      const todo = state.todos.find(f => f.id == id);

      if (todo === undefined) {
        throw new TypeError(`no Todo with id: ${id}`);
      }

      todo.isCompleted = !todo.isCompleted
    }
  },
  actions: {},
  modules: {}
});
