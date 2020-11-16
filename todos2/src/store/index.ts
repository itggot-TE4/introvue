import { createStore } from "vuex";

export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const reqHeader = {
  method: "get",
  headers: {
    "content-type": "application/json"
  }
}

export default createStore({
  strict: true,
  state: {
    todos: [] as Todo[]
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    delTodo(state, id) {
      state.todos = state.todos.filter(f => f.id !== id);
    },
    toggleCompleted(state, id) {
      const todo = state.todos.find(f => f.id == id);

      if (todo === undefined) {
        throw new TypeError(`no Todo with id: ${id}`);
      }

      todo.isCompleted = !todo.isCompleted;
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      const res = await fetch("http://localhost:9292/api/v1/todos", {
        ...reqHeader
      });
      const todos = await res.json();
      todos.forEach((todo: Todo) => {
        commit("addTodo", todo);
      });
    }
  },
  getters: {
    getTodoById: state => (id: number) => {
      return state.todos.find(todo => todo.id === id);
    }
  },
  modules: {}
});
