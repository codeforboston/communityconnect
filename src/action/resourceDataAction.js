import * as types from '../constants/resourceData';
import api from '../api/googlesheetApi';

const loadResourceDataStart = () => ({ type: types.LOAD_RESOURCE_DATA_START })
const loadResourceDataSuccess = (resourceData ) => ({ type: types.LOAD_RESOURCE_DATA_SUCCESS, resourceData })
const loadResourceDataFailure = (error) => ({ type: types.LOAD_RESOURCE_DATA_FAILURE, error })

export function loadResources(){
    return function (dispatch) {
        dispatch(loadResourceDataStart());
        console.log(api.getResourceData());
        /*return api.getResourceData().then(data => {
            loadResourceDataSuccess(data);
        }).catch(error => loadResourceDataFailure(error));*/
    }
}