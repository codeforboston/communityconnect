import { combineReducers } from "redux";
import resourceReducers from "./resourceReducers";

const rootReducer = combineReducers(resourceReducers);
export default rootReducer;
