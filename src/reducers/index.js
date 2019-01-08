import { combineReducers } from 'redux';
import resource from './resourceReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
    resource,
    categories
});

export default rootReducer;