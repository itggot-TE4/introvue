import { Module } from 'vuex';

export interface AuthState {
  token: string
}

export default {
  namespaced: true,
  state: {
    token: ""
  },
  mutations: {},
  actions: {},
  getters: {}
} as Module<AuthState, {}>;