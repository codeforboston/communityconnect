import * as types from './actionType';
import {getAllResources} from '../api/googlesheetApi';

const loadResourceDataStart = () => ({ type: types.LOAD_RESOURCE_DATA_START })
const loadResourceDataSuccess = (resource ) => ({ type: types.LOAD_RESOURCE_DATA_SUCCESS, resource })
const loadResourceDataFailure = (error) => ({ type: types.LOAD_RESOURCE_DATA_FAILURE, error })

export function loadCategories(){
    return { type: types.LOAD_CATEGORIES }
}


export function loadResources(){
    return function (dispatch) {
        dispatch(loadResourceDataStart());
        return getAllResources.then(resources => {
            dispatch(loadResourceDataSuccess(resources));
        }).catch(error => {
            dispatch(loadResourceDataFailure(error));
        });
    }
}

export function filterByCategories(filteredResource){
    return { type: types.FILTER_RESOURCE_BY_CATEGORIES, filteredResource }
}

export function addSavedResource(savedResource){
    return { type: types.ADD_SAVED_RESOURCE, savedResource }
  }

export function removeSavedResource(savedResourceIndex){
    return { type: types.REMOVE_SAVED_RESOURCE, savedResourceIndex }
  }
