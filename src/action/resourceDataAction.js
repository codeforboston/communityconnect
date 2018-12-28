import * as types from '../constants/resourceData';
import {promise} from '../api/googlesheetApi';

export const loadResourceDataStart = () => ({ type: types.LOAD_RESOURCE_DATA_START })
export const loadResourceDataSuccess = (resource ) => ({ type: types.LOAD_RESOURCE_DATA_SUCCESS, resource })
export const loadResourceDataFailure = (error) => ({ type: types.LOAD_RESOURCE_DATA_FAILURE, error })

export function loadResources(){
    return function (dispatch) {
        dispatch(loadResourceDataStart());
        return promise.then(value => {
            dispatch(loadResourceDataSuccess(value));
        }).catch(error => {
            dispatch(loadResourceDataFailure(error));
        });
    }
}