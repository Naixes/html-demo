import React from 'react';

import {createStore, applyMiddleware} from '../store/myRedux'

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'add':
        return state + 1
    case 'minus':
        return state - 1
    default:
        return state
  }
}

// 自定义中间件
const logger = () => {
  // midParams中的dispatch
  return dispatch => action => {
    // 执行中间件
    console.log(action.type+'执行啦!!!')
    // 执行下一个中间件/原来的dispatch
    return dispatch(action)
  }
}

// thunk实现
const thunk = ({getState}) => dispatch => action => {
    // thunk逻辑：处理函数action
	if (typeof action == 'function') {
		return action(dispatch, getState)
  }
    // 不是函数直接跳过,执行下一个中间件/原来的dispatch
	return dispatch(action)
}

const counter = createStore(counterReducer, applyMiddleware(logger, thunk))

class ReduxTest extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    counter.subscribe(() => {
        this.forceUpdate()
    })
  }
  render() {
    return (
        <div>
            <p>{counter.getState()}</p>
            <button onClick={() => {counter.dispatch({type: 'add'})}}>+</button>
            <button onClick={() => {counter.dispatch({type: 'add'})}}>+</button>
            <button onClick={() => {counter.dispatch(function(){
                setTimeout(() => {
                  counter.dispatch({ type: "add" })
                }, 1000);
            })}}>-</button>
        </div>
    )
  }
}

export default ReduxTest