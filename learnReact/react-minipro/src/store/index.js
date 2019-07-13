
// redux
import {createStore} from 'redux'

import {GET_LIST} from '../actions'

function reducer(state={items: []}, actions) {
    switch(actions.type) {
        case GET_LIST: 
            return {
                ...state,
                items: actions.items
            }
        default: 
            return state
    }
}

// 创建存储对象
export default createStore(reducer)