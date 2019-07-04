import React, {Component} from 'react';
import Comp from './Comp'

// redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// 状态对象
// 初始化和每次更新状态对象时都会执行
// 传入旧的状态返回新的状态
function reducer(state={}, action) {
  // 返回新的state
  return state
}
// 创建存储对象
const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        root
        <Comp/>
      </div>
    )
  }
}

export default App;
