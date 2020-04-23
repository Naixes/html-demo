import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    // 全局定义便于访问
    roles: state => state.user.roles
  },
  modules: {user, permission}
})
