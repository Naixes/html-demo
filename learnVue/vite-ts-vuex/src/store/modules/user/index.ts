import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { createStore } from './store'

const state = createStore

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}