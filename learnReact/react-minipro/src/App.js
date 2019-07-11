import React, {Component} from 'react';

// 状态映射，合并冲突
import {connect} from 'react-redux'
// 独立的actions，当actions没找到时会报错，好维护
import {SET_AGE} from './actions'

// 路由
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import View from './pages/view';
import Add from './pages/add';

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
        <div>
          <Link className="btn btn-default glyphicon glyphicon-plus" to="/add">添加商品</Link>

          <Route path="/" exact component={View} />
          <Route path="/add" component={Add} />
        </div>
      </Router>
    )
  }
}

export default connect(function (state, props) {
  console.log(state, props)
  return state.user
}, {
  setAge(newAge) {
    return {
      type: SET_AGE,
      newAge
    }
  }
})(App)
