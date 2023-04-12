const CLICK = "CLICK";

let initialState = {
  count: 0,
};

const pageTwoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export const click = () => {
  return {
    type: CLICK,
  };
};

export default pageTwoReducer;
