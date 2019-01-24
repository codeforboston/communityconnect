import { combineReducers } from 'redux';
import * as resources from './resourceReducer';

const rootReducer = combineReducers(
    resources
);

export default rootReducer;