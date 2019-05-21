import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    a: 0,
    b: 0
  },
  mutations: {
    addA (state, n) {
      state.a += n
    },
    addB (state, n) {
      state.b += n
    },
    setA (state, val) {
      state.a = val
    },
    setB (state, val) {
      state.b = val
    }
  },
  actions: {
    addA ({commit}, n) {
      commit('addA', n)
    },
    addB ({commit}, n) {
      commit('addB', n)
    },
    setA ({commit}, val) {
      commit('setA', val)
    },
    setB ({commit}, val) {
      commit('setB', val)
    }
  },
  getters: {
    count (state) {
      return state.a + state.b
    }
  },
  modules: {}
})
