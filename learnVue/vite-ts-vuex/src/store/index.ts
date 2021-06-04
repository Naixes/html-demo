import { userState } from './modules/user/store';
import { wechatState } from './modules/wechat/store';
import { createStore } from 'vuex';
import modules from './modules'

// 导出
export interface State {
    user: userState
    wechat: wechatState
}

export default createStore<State>({
    modules
})