const initialState = {
  isIdle: false,
};

const IdleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERISIDLE":
      return { ...state, isIdle: true };
    case "USERISACTIVE":
      return { ...state, isIdle: false };
    default:
      return state;
  }
};

export default IdleReducer;
