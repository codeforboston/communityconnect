
import * as types from '../constants/resourceData';
import initialState from './initialState';

export default function resourceData(state = initialState.resource, action) {
    console.log("Action: ", action);
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign({}, action.resource);

        default:
            return state;
    }
}