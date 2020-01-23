import * as types from "./actionType";
import getAllResources from "../api/googlesheetApi";

const loadResourceDataStart = () => ({
  type: types.LOAD_RESOURCE_DATA_START,
  isFetchingResource: true,
});

const loadResourceDataSuccess = resources => ({
  type: types.LOAD_RESOURCE_DATA_SUCCESS,
  resources,
  isFetchingResource: false,
});

const loadResourceDataFailure = error => ({
  type: types.LOAD_RESOURCE_DATA_FAILURE,
  error,
});

export function loadCategories() {
  return { type: types.LOAD_CATEGORIES };
}

export function loadResources(resourcePath) {
  return dispatch => {
    dispatch(loadResourceDataStart());

    return getAllResources(resourcePath)
      .then(resources => {
        // update with call using specific
        dispatch(loadResourceDataSuccess(resources));
      })
      .catch(error => {
        dispatch(loadResourceDataFailure(error));
      });
  };
}

export function filterByCategories(filteredResource) {
  return { type: types.FILTER_RESOURCES_BY_CATEGORIES, filteredResource };
}

export function filterBySearch(searchedResource) {
  return { type: types.FILTER_RESOURCES_BY_SEARCH, searchedResource };
}

export function addSavedResource(savedResource) {
  return { type: types.ADD_SAVED_RESOURCE, savedResource };
}

export function removeSavedResource(savedResourceIndex) {
  return { type: types.REMOVE_SAVED_RESOURCE, savedResourceIndex };
}

export function clearSavedResources() {
  return { type: types.CLEAR_SAVED_RESOURCES };
}
