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

    return {
        getState,
        subscribe,
        dispatch
    }
}