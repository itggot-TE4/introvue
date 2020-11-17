import { Module } from 'vuex';

export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface TodosState {
  todos: Todo[],
  token: string
}

const reqHeader = {
  method: "get",
  headers: {
    "content-type": "application/json",
    "Authorization": ""
  },
}

export default {
  namespaced: true,
  state: {
    todos: [],
    token: ""
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
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('access_token', token);
      reqHeader.headers["Authorization"] = `Bearer ${token}`
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
    },
    async createTodo({ commit }, newTodo) {
      const res = await fetch("http://localhost:9292/api/v1/todos", {
        ...reqHeader,
        method: "post",
        body: JSON.stringify(newTodo)
      })
      const todo = await res.json();

      commit("addTodo", todo);
    },
    async delTodo({ commit }, id) {
      await fetch(`http://localhost:9292/api/v1/todos/${id}`, {
        ...reqHeader,
        method: "delete"
      })

      commit("delTodo", id);
    },
    async toggleCompleted({ commit, getters }, id) {
      const todoItem = getters.getTodoById(id);
      await fetch(`http://localhost:9292/api/v1/todos/${todoItem.id}`, {
        ...reqHeader,
        method: "PATCH",
        body: JSON.stringify({
          isCompleted: todoItem.isCompleted
        })
      })

      commit("toggleCompleted", id);
    }
  },
  getters: {
    getTodoById: state => (id: number) => {
      return state.todos.find(todo => todo.id === id);
    },
    numTodos(state) {
      return state.todos.length;
    }
  }
} as Module<TodosState, {}>;