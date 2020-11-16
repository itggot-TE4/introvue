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
    todos: [{id: 24, title: 'lel'}] as Todo[]
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
  getters: {
    getTodos: (state) => {
      return state.todos
    },
    getTodoById: (state, getters) => (id : number) => {
      const todo = getters.getTodos.find((todo : Todo) => {
        console.log(`testing ${todo.id} with ${id}`);
        console.log(todo.id === id);
        return todo.id === id;
      })
      console.log(state.todos)
      console.log(id)
      console.log("__")
      console.log(todo)
      return todo
    }
  },
  modules: {}
});
