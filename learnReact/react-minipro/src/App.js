import React, {Component} from 'react';

// 状态映射，合并冲突
import {connect} from 'react-redux'
// 独立的actions，当actions没找到时会报错，好维护
import {GET_LIST} from './actions'

// 请求处理
import Ajax from './ajax'

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
  async componentDidMount() {
    let {data} = await Ajax.get('list')
    this.props.getList(data)
  }
  render() {
    return (
      <Router>
        <div>
          <Link className="btn btn-default glyphicon glyphicon-plus" to="/add">添加商品</Link>

          <Route path="/" exact component={View} />
          {/* 利用路由显示模态框方式刷新消失 */}
          <Route path="/add" component={Add} />
        </div>
      </Router>
    )
  }
}

export default connect(function (state, props) {
  // console.log(state, props)
  return state
}, {
  getList(items) {
    return {
      type: GET_LIST,
      items
    }
  }
})(App)
