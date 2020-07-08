const initialState = {
  scannerMode: "scanner",
  printerMode: "printer",
  idleTime: 0,
  resetTime: 0,
  jurorData: {},
};

const ScannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SCANNERMODE":
      return { ...state, scannerMode: action.payload };
    case "PRINTERMODE":
      return { ...state, printerMode: action.payload };
    case "SETIDLETIME":
      return { ...state, idleTime: action.payload };
    case "SETRESETTIME":
      return { ...state, resetTime: action.payload };
    case "HANDLEJURORDATA":
      return { ...state, jurorData: action.payload };
    default:
      return state;
  }
};

export default ScannerReducer;
