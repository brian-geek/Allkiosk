import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import IdleReducer from "./IdleReducer";
import ScannerReducer from './ScannerReducer';

const reducers = combineReducers({
  toastr: toastrReducer,
  idle: IdleReducer,
  scanner: ScannerReducer
});

export default reducers;
