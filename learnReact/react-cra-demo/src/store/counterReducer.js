export const add = (num) => ({ type: 'add', payload: num })

export const minus = () => ({type: 'minus'})

// saga异步
export const sagaAdd = () => ({type: 'sagaAdd'})

// 异步增加
export const asyncAdd = (dispatch, getState) => dispatch => {
    setTimeout(() => {
        dispatch({type: 'add'})
    }, 1000)
} 

export const counterReducer = (state = 0, action) => {
    const num = action.payload || 1
    switch(action.type) {
        case 'add':
            return state + num
        case 'minus':
            return state - num
        default:
            return state
    }
}