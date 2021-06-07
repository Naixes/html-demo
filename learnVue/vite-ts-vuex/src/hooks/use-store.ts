import {useStore} from 'vuex'
import { State } from '../store'
import { Getters } from '../store/utils'

interface UseSinStore {
    state: State;
    getters: Getters;
    dispatch: any
}

// 封装useStore()
const useSinStore = (): UseSinStore => {
    const store = useStore<State>()
    const {state, getters, dispatch} = store
    return {state, getters, dispatch}
}

export {useSinStore}