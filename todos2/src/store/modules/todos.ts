import { Module } from 'vuex';
import axios from "axios";

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
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      const resp = await axios.get("http://localhost:9292/api/v1/todos");

      if (resp.data) {
        resp.data.forEach((todo: Todo) => {
          commit("addTodo", todo);
        });
      }
    },
    async createTodo({ commit }, newTodo) {
      const todo = await axios.post("http://localhost:9292/api/v1/todos", newTodo);

      if (todo.data) {
        commit("addTodo", todo);
      }
    },
    async delTodo({ commit }, id) {
      await axios.delete(`http://localhost:9292/api/v1/todos/${id}`);

      commit("delTodo", id);
    },
    async toggleCompleted({ commit, getters }, id) {
      const todoItem = getters.getTodoById(id);
      await axios.patch(`http://localhost:9292/api/v1/todos/${todoItem.id}`, {
        isCompleted: todoItem.isCompleted
      });

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