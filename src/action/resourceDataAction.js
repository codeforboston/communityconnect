import * as types from './actionType';
import {getAllResources, getAllCategories} from '../api/googlesheetApi';

export const loadResourceDataStart = () => ({ type: types.LOAD_RESOURCE_DATA_START })
export const loadResourceDataSuccess = (resource ) => ({ type: types.LOAD_RESOURCE_DATA_SUCCESS, resource })
export const loadResourceDataFailure = (error) => ({ type: types.LOAD_RESOURCE_DATA_FAILURE, error })

export const loadCategoriesStart = () => ({ type: types.LOAD_CATEGORIES_START })
export const loadCategoriesSuccess = (categories) => ({ type: types.LOAD_CATEGORIES_SUCCESS, categories })
export const loadCategoriesFailure = (error) => ({ type: types.LOAD_CATEGORIES_FAILURE, error })

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

export function loadCategories(){
    return function (dispatch) {
        dispatch(loadCategoriesStart());
        return getAllCategories.then(categories => {
            dispatch(loadCategoriesSuccess(categories));
        }).catch(error => {
            dispatch(loadCategoriesFailure(error));
        });
    }
}