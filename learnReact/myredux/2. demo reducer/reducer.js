export default function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state,
          count: state.count + 1,
        };
      case 'DECREMENT':
        return {
          ...state,
          count: state.count - 1,
        };
      default:
        //如果没有人给你状态 默认的吐出去
        return state;
    }
  }
  