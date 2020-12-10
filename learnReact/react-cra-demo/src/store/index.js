
// redux
import {createStore, combineReducers, applyMiddleware} from 'redux'
import user from './user'
import company from './company'
import {counterReducer} from './counterReducer'

import mySaga from './saga'

import logger from 'redux-logger'
// redux不支持异步操作,需要中间件支持
// redux-saga是redux的中间件，一种异步解决方案，类似的还有redux-thunk，redux-promise
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware()

// 初始化状态,指定状态变化规则
// reducer:函数,返回新的状态值,不能直接改变
// const counterReducer = (state = 0, action) => {
//     switch(action.type) {
//         case 'add':
//             return state + 1
//         case 'minus':
//             return state - 1
//         default:
//             return state
//     }
// }
// export const counter = createStore(counterReducer)

// 模块化:将多个reducer合并
let arr = combineReducers({
    counterReducer,
    user,
    company
})

// 创建存储对象
// export default createStore(arr, applyMiddleware(logger, thunk))
const store = createStore(arr, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(mySaga)

export default store