import {useStore} from 'vuex'
import { State } from '../store'

interface UseSinStore {
    state: State;
    getters: any;
    dispatch: any
}

// 封装useStore()
const useSinStore = (): UseSinStore => {
    const store = useStore<State>()
    const {state, getters, dispatch} = store
    return {state, getters, dispatch}
}

export {useSinStore}