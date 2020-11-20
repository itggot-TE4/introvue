import { Module } from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

interface User {
  id: number;
  username: string;
}

export interface UserState {
  token: string;
  currentUser: User;
}

export default {
  namespaced: true,
  state: {
    token: "",
    currentUser: {} as User
  },
  mutations: {
    updateUser(state, user) {
      state.currentUser = user;
    },
    updateToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, token) {
      commit("updateToken", token);
      const decoded = jwt.decode(token) as DecodedToken;
      if (decoded) {
        console.log("logged in: " + decoded.id);
        const user = await axios.get("http://localhost:9292/api/v1/users");
        console.log(user);
        commit("updateUser", user.data);
      }
    }
  },
  getters: {
    name(state) {
      return state.currentUser.username;
    },
    token(state) {
      return state.token;
    }
  }
} as Module<UserState, {}>;
