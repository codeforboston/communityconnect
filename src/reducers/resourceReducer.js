
import * as types from '../constants/resourceData';
import initialState from './initialState';

export default function resourceData(state = initialState.resourceData, action){
    switch(action.types){
        case types.LOAD_RESOURCE_DATA_SUCCESS: return action.resourceData;
        default: return state;
    }
}