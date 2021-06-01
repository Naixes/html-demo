import store from './store'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => ({
    namespaced: true,
    state: store(),
    actions,
    mutations,
    getters
})