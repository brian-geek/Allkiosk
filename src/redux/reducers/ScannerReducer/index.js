const initialState = {
  scannerMode: "scanner",
  jurorData: {},
};

const ScannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SCANNERMODE":
      return { ...state, scannerMode: action.payload };
    case "HANDLEJURORDATA":
      return { ...state, jurorData: action.payload };
    default:
      return state;
  }
};

export default ScannerReducer;
