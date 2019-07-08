import React, {Component} from 'react';
import Comp from './Comp'

// 状态映射，合并冲突
import {connect} from 'react-redux'

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      name: 'three'
    }
  }
  changeAge() {
    this.props.setAge(20)
  }
  render() {
    return (
      <div className="App">
        name：{this.state.name}<br/>
        desc: {this.props.desc}<br/>
        age: {this.props.age}
        {/* 注意绑定this */}
        <input type="button" value="改变age" onClick={this.changeAge.bind(this)}></input>
        <Comp/>
      </div>
    )
  }
}

// export default App;
// connect(fn1, {})
// fn1：解决冲突，state：reducer中的state，props组件接收的的参数
// {}：action
export default connect(function (state, props) {
  console.log(state, props)
  // 结果冲突，混合state和props
  return state
}, {
  // 可以当作组件的一部分，props中可以访问
  setAge(newAge) {
    // 必须return，返回为action
    return {
      // 用来区分不同的操作
      type: 'set_age',
      // 新值
      newAge
    }
  }
})(App)
