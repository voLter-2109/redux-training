const CLICKHOME = "CLICKHOME";

let initialState = {
  count: 0,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICKHOME:
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
    type: CLICKHOME,
  };
};

export default homeReducer;
