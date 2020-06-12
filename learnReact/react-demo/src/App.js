import React, {Component} from 'react';
import Comp from './Comp'

import JsxTest from "./components/JsxTest";
import StateMgt from "./components/StateMgt";
import EventHandle from "./components/EventHandle";
import ContextTest from "./components/ContextTest";
import HocTest from "./components/HocTest.js";
import Composition from "./components/Composition";
import HooksTest from "./components/HooksTest";

// 状态映射，合并冲突
import {connect} from 'react-redux'
// 独立的actions，当actions没找到时会报错，好维护
import {SET_AGE} from './actions'

// 路由
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './home'
import News from './news/index'

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
      <Router>
        <h3>JsxTest</h3>
        {/* <JsxTest /> */}
        <h3>状态管理</h3>
        {/* <StateMgt /> */}
        <h3>事件处理</h3>
        {/* <EventHandle /> */}
        <h3>上下文</h3>
        {/* <ContextTest /> */}
        <h3>Hoc</h3>
        {/* <HocTest /> */}
        <h3>组件复合</h3>
        {/* <Composition /> */}
        <h3>Hooks</h3>
        <HooksTest />
        <h3>redux</h3>
        {/* <div className="App">
          name：{this.state.name}<br/>
          desc: {this.props.desc}<br/>
          age: {this.props.age}
          <input type="button" value="改变age" onClick={this.changeAge.bind(this)}></input>
          <Comp/>
        </div> */}
        {/* 路由 */}
        <h3>路由</h3>
        {/* <div className="nav-bar">
          <Link to="/">首页</Link>
          <Link to="/news">新闻</Link>
        </div>

        <Route path="/" exact component= {Home}></Route>
        <Route path="/news" exact component= {News}></Route> */}
      </Router>
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
  return state.user
}, {
  // 可以当作组件的一部分，props中可以访问
  setAge(newAge) {
    // 必须return，返回为action
    return {
      // 用来区分不同的操作
      type: SET_AGE,
      // 新值
      newAge
    }
  }
})(App)
