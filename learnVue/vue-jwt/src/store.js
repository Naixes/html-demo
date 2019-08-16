import Vue from 'vue';
import Vuex from 'vuex';

import { login, checkLogin } from './api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    async login({ commit }, username) {
      const r = await login(username);
      if (r.code === 1) {
        Promise.reject(r);
      }
      localStorage.setItem('token', r.token);
      commit('setUsername', r.username);
      return r;
    },
    async checkLogin({ commit }) {
      const r = await checkLogin();
      if (r.code === 1) {
        return false;
      }
      // 重置token
      localStorage.setItem('token', r.token);
      commit('setUsername', r.username);
      return true;
    },
  },
});
