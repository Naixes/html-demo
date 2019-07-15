// redux
import {createStore} from 'redux'

import {GET_LIST, ADD_ITEM, DEL_ITEM} from '../actions'

function reducer(state={items: []}, action) {
    switch(action.type) {
        case GET_LIST: 
            return {
                ...state,
                items: action.items
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item
                ]
            }
        case DEL_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.ID !== action.ID)
                
            }
        default: 
            return state
    }
}

// 创建存储对象
export default createStore(reducer)