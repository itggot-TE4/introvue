import { Module } from 'vuex';
import axios from "axios";
import jwt from "jsonwebtoken";

export interface AuthState {
  token: string
}

export default {
  namespaced: true,
  state: {
    token: ""
  },
  mutations: {
    login(state, token) {
      state.token = token;
      console.log(jwt.decode(token))
      localStorage.setItem("access_token", token);
    }
  },
  actions: {
    async authorize({ commit }, credentials) {
      axios
        .post("http://localhost:9292/api/v1/users/login", credentials)
        .then((resp) => {
          commit('login', resp.data.token)
        });
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.token.length > 0;
    }
  }
} as Module<AuthState, {}>;