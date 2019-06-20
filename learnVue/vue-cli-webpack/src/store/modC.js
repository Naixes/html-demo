export default {
  state: {
    sta_a: 3,
    sta_b: 3
  },
  mutations: {
    'modC.addA' (state, n) {
      state.sta_a += n
    },
    'modC.addB' (state, n) {
      state.sta_b += n
    },
    addA (state, n) {
      state.sta_a += n
    },
    addB (state, n) {
      state.sta_b += n
    },
    setA (state, val) {
      state.sta_a = val
    },
    setB (state, val) {
      state.sta_b = val
    }
  },
  actions: {
    // actions和mutations没有独立的模块如果需要区分可以对名称进行区分
    'modC.addA' ({commit}, n) {
      commit('modC.addA', n)
    },
    'modC.addB' ({commit}, n) {
      commit('modC.addB', n)
    },
    // 如果和主模块有同名的方法会同时触发
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
  }
}
