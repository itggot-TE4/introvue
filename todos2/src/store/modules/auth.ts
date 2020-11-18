import { Module } from 'vuex';
import axios from "axios";

export interface AuthState {
  token: string
}

export default {
  namespaced: true,
  state: {
    token: ""
  },
  mutations: {},
  actions: {
    async authorize({ commit, dispatch }, credentials) {
      const resp = await axios.post("http://localhost:9292/api/v1/users/login", credentials);

      dispatch('user/login', resp.data.token, { root:true })
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.token.length > 0;
    }
  }
} as Module<AuthState, {}>;