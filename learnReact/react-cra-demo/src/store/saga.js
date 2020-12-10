import {call, put, takeEvery} from 'redux-saga/effects'

function timout() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(3)
        }, 1000)
    })
}

function* asyncAdd() {
    // call将异步改为同步语法
    // 第二个参数是函数的入参
    const result = yield call(timout)
    console.log('result', result);
    yield put({type: 'add', payload: result})
}

function* mySaga() {
    // 每次dispatch({type:sagaAdd})时执行回调
    yield takeEvery('sagaAdd', asyncAdd)
}

export default mySaga