
import * as types from '../action/actionType';
import initialState from './initialState';

export default function categoriesReducer(state = initialState.categories, action) {
    console.log("Category reducer: ", action.type);
    switch (action.type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            return Object.assign([], action.categories);

        default:
            return state;
    }
}