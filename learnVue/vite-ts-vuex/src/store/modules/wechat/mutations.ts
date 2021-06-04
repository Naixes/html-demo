import { userState } from './store';
import { GET_DATA } from "./constant"

const mutations = {
    [GET_DATA](state: userState, payload: boolean):void {
        state.loading = payload
    }
}

export default mutations