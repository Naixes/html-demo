
// redux
import {createStore, combineReducers} from 'redux'
import user from './user'
import company from './company'
import {counterReducer} from './counterReducer'

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

// 将多个reducer合并
let arr = combineReducers({
    counterReducer,
    user,
    company
})

// 创建存储对象
export default createStore(arr)