 import {SET_AGE} from '../actions'
// 状态对象
// 初始化和每次更新状态对象时都会执行
// 传入旧的状态返回新的状态
export default function reducer(state={name: 'one', age: 18}, action) {
    if(action.type === SET_AGE) {
        // 改变后必须返回新的state
        return {
            ...state,
            age: action.newAge
        }
    }
    return state
}