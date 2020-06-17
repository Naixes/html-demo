// 实现createStore
// enhance:增强,applyMiddleware的返回值
export const createStore = (reducer, enhance) => {
    // 如果存在enhance
    if(enhance) {
        // 传入createStore,用于enhance执行完中间件后返回,然后传入reducer再执行
        // 返回增强后的store
        return enhance(createStore)(reducer)
    }

    let state = undefined
    const listenerList = []

    // getState
    const getState = () => {
        return state
    }
    // dispatch
    const dispatch = (action) => {
        // 执行reducer改变state
        state = reducer(state, action)
        // 变更通知:执行回调
        listenerList.forEach(callback => callback())
    }
    // subscribe
    const subscribe = (callback) => {
        // 存储回调函数
        listenerList.push(callback)
    }
    // 初始化状态:执行一次reducer
    dispatch({type: '@SIN/LEARNREACT-REDUX'})
    return {
        getState,
        dispatch,
        subscribe
    }
}

// 实现中间件
// 接受若干个中间件,返回一个函数就是上面的enhance,该函数先执行createStore
export const applyMiddleware = (...midlewares) => {
    // 返回函数即为enhance,从enhance传入的createStore
    // ...args即为reducer
    return createStore => (...args) => {
        // 先执行原来的createStore
        const store = createStore(...args)
        // 原来的dispatch
        let dispatch = store.dispatch
        // 传给中间件的参数:getState,dispatch
        const midParams = {
            getState: store.getState,
            // ...args接收中间件传过来的参数,action
            dispatch: (...args) => dispatch(...args)
        }
        // 执行中间件,保存所有的中间件返回函数
        const chain = midlewares.map(mw => mw(midParams))
        // 强化dispatch:聚合函数,传入之前的dispatch执行聚合函数返回加强后的dispatch
        dispatch = compose(...chain)(store.dispatch)
        console.log('dispatch', dispatch)
        // 返回强化后的store
        return {
            ...store,
            dispatch
        }
    }
}

// 聚合函数:[fn1,fn2] => fn2(fn1())
export const compose = (...funcs) => {
    if (funcs.length === 0) {
      return arg => arg;
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce((left, right) => (...args) => right(left(...args)))
}