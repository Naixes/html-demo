let initState = {
    name: 'sin',
    description: 'naixes',
  };
  
  export default function infoReducer(state, action) {
    //   初始化
    if (!state) {
      state = initState;
    }
    switch (action.type) {
      case 'SET_NAME':
        return {
          ...state,
          name: action.name,
        };
      case 'SET_DECREMENT':
        return {
          ...state,
          description: action.description,
        };
      default:
        return state;
    }
  }
  