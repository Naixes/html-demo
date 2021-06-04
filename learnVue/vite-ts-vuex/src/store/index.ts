import { userState } from './modules/user/store';
import { createStore } from 'vuex';
import modules from './modules'

// 导出
export interface State {
    user: userState
}

export default createStore<State>({
    modules
})