import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// 状态对象
// 初始化和每次更新状态对象时都会执行
// 传入旧的状态返回新的状态
function reducer(state={name: 'one', age: 18}, action) {
    if(action.type === 'set_age') {
        // 改变后必须返回新的state
        return {
            ...state,
            age: action.newAge
        }
    }
    return state
}
// 创建存储对象
const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App name='two' desc='desc' age={19}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
