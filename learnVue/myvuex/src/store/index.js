import Vue from 'vue';
import Vuex from '@/store/ydvuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
  },
  mutations: {
    add(state) {
      state.counter += 1;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add');
      }, 500);
    },
  },
  modules: {
  },
});
