import { Module } from 'vuex';
import axios from "axios";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string
}

export interface UserState {
  token: string,
  currentId: number
}

export default {
  namespaced: true,
  state: {
    token: "",
    currentId: -1
  },
  mutations: {
    updateUserId(state, userId) {
      state.currentId = userId;
    },
    updateToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, token) {
      commit('updateToken', token);
      const decoded = jwt.decode(token) as DecodedToken;
      if (decoded) {
        console.log("logged in: " + decoded.id);
        commit('updateUserId', +decoded.id);
      }
    }
  },
  getters: {
    userId(state) {
      return state.currentId;
    }
  }
} as Module<UserState, {}>;