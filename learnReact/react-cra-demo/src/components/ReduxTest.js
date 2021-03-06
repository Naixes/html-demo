import React from 'react';
import {connect} from 'react-redux'
// import {counter} from '../store/index'
import {add, minus, asyncAdd, sagaAdd} from '../store/counterReducer'

// 结合react-redux
// 需要先在index.js全局引入store
// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch => {return {add:()=>dispatch({type:'add'})}}
// connect的两个作用:
// 自动渲染
// 映射到属性,在props中访问
@connect(
    // 状态映射
    (state) => ({num: state.counterReducer}),
    // action creator
    // {
    //     add: () => ({ type: 'add' }),
    //     minus: () => ({type: 'minus'})
    // }
    // 将action creator封装进文件
    { add, minus, asyncAdd, sagaAdd }
)
class ReduxTest extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  // 原生Redux  
//   componentDidMount() {
//     // 订阅变更
//     counter.subscribe(() => {
//         // 强制更新
//         this.forceUpdate()
//     })
//   }
  render() {
    return (
        // 获取状态
        <div>
            {/* 原生Redux */}
            {/* <p>{counter.getState()}</p> */}
            {/* 参数传入action */}
            {/* <button onClick={() => {counter.dispatch({type: 'add'})}}>+</button>
            <button onClick={() => {counter.dispatch({type: 'minus'})}}>-</button> */}

            {/* 结合react-redux */}
            <p>{this.props.num}</p>
            {/* 参数传入action */}
            <button onClick={() => this.props.add(2)}>+2</button>
            <button onClick={this.props.sagaAdd}>saga + 3</button>
            <button onClick={this.props.asyncAdd}>async +</button>
            <button onClick={this.props.minus}>-</button>
        </div>
    )
  }
}

export default ReduxTest