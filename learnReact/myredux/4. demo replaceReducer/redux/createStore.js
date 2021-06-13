export function createStore(reducer, initialState) {
    let state = initialState
    const listeners = []

    const getState = () => {
        return state
    }

    const subscribe = function (listener) {
        listeners.push(listener)
    }

    const dispatch = function(action) {
        //dispatch + reducer 状态的修改
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener()
        }
    }

    // 初始化，否则initialState没传时会出错
    dispatch({type: Symbol()})

    // 替换reducer，之前的reducer不会再用时使用
    const replaceRedux = function (nextReducer) {
        reducer = nextReducer
        dispatch({type: Symbol()})
    }

    return {
        getState,
        subscribe,
        dispatch,
        replaceRedux
    }
}