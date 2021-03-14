import userReducer from "./users";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userReducer: userReducer,
});
export default allReducers;
