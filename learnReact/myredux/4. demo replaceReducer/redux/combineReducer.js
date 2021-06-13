export function combineReducer(reducers) {
    // counte，info
    const reducerKeys = Object.keys(reducers)
    // 返回一个可以执行相应reducer返回state的函数
    return function combination(state = {}, action) {
        const nextState = {}
        // 执行reducer
        for (let i = 0; i < reducerKey.length; i++) {
            // 获取需要执行的reducer和state
            const key = reducerKey[i];
            const reducer = reducers[key]
            const preState = state[key]
            // 执行reducer得到最新的state
            const nextStateForKey = reducer(preState, action)
            nextState[key] = nextStateForKey
        }
        // 返回最新的state
        return nextState
    }
}