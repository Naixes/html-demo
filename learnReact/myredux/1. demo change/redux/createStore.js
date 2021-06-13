export function createStore(initialState) {
    let state = initialState
    const listeners = []

    const getState = () => {
        return state
    }

    const subscribe = function (listener) {
        listeners.push(listener)
    }

    const changeState = function(newState) {
        state = newState
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener()
        }
    }

    return {
        getState,
        subscribe,
        changeState
    }
}