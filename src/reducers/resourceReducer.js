
import * as types from '../action/actionType';
import initialState from './initialState';

export default function resourceReducer(state = initialState.resource, action) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], action.resource);

        default:
            return state;
    }
}