import { combineReducers } from 'redux';
import * as resources from './resourceReducer';
import * as mapResource from './mapResourceReducer';

const rootReducer = combineReducers(
    resources,
    mapResource
);

export default rootReducer;