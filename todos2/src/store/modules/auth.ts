import { Module } from 'vuex';
import axios from "axios";

export interface AuthState {
  failure: string
}

export default {
  namespaced: true,
  state: {
    failure: ""
  },
  mutations: {
    setFailure(state, err) {
      state.failure = err;
    }
  },
  actions: {
    async authorize({ commit, dispatch }, credentials) {
      try {
        const resp = await axios.post("http://localhost:9292/api/v1/users/login", credentials);

        console.log("do i get here?")
        dispatch('user/login', resp.data.token, { root:true })
      } catch (err) {
        commit('setFailure', err.message)
      }
    }
  },
  getters: {
    failure(state) {
      return state.failure
    }
  }
} as Module<AuthState, {}>;