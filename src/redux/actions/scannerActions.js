export const setScannerMode = () => (dispatch) => {
  dispatch({ type: "SCANNERMODE", payload: "take me" });
};

export const handleJurorData = (jurorData) => (dispatch) => {
  dispatch({ type: "HANDLEJURORDATA", payload: jurorData });
};