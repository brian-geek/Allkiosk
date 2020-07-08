import { getSettingsInfo } from "../../clients/api";

export const getSettingsData = () => async (dispatch) => {
  getSettingsInfo()
    .then((res) => res.text())
    .then((result) => JSON.parse(result))
    .then((result) => {
      dispatch({ type: "SETIDLETIME", payload: result.idleTime });
      dispatch({ type: "SETRESETTIME", payload: result.resetTime });
      dispatch({ type: "SCANNERMODE", payload: result.scannerMode });
      dispatch({ type: "PRINTERMODE", payload: result.printerMode });
    })
    .catch((err) => {
      throw err;
    });
};
