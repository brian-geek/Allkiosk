import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import IdleReducer from "./IdleReducer";

const reducers = combineReducers({
  toastr: toastrReducer,
  idle: IdleReducer,
});

export default reducers;
