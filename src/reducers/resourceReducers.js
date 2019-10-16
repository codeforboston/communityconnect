import * as types from "../action/actionType";
import { getQueryResources } from "../utils/resourcesQuery";
import initialState from "./initialState";

function resourcesReducer(state = initialState.resources, action) {
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_SUCCESS:
      return [...state, ...action.resources];
    default:
      return state;
  }
}

function isFetchingResourceReducer(
  state = initialState.isFetchingResource,
  action
) {
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_START:
      return true;
    case types.LOAD_RESOURCE_DATA_SUCCESS:
      return false;
    default:
      return state;
  }
}

function categoriesReducer(state = initialState.categories, action) {
  console.log("Reducer: ", action);
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_SUCCESS: {
      const categoriesData = {};

      action.resources.forEach(data => {
        const category = data.categories.split(",");

        category.forEach(cat => {
          categoriesData[cat] = cat.trim();
        });
      });

      const categoryList = [...new Set(Object.values(categoriesData))];
      const index = categoryList.indexOf("");

      if (index > -1) {
        categoryList.splice(index, 1);
      }

      return [...state, ...categoryList];
    }
    default:
      return state;
  }
}

function filteredResourcesReducer(
  state = initialState.filteredResources,
  action
) {
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_SUCCESS:
      return [...state, ...action.resources];
    case types.FILTER_RESOURCES_BY_CATEGORIES:
      return action.filteredResource;
    default:
      return state;
  }
}

function searchedResourcesReducer(
  state = initialState.searchedResources,
  action
) {
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_SUCCESS:
      return [...state, ...action.resources];
    case types.FILTER_RESOURCES_BY_SEARCH:
      return action.searchedResource;
    default:
      return state;
  }
}

function savedResourcesReducer(state = initialState.savedResources, action) {
  switch (action.type) {
    case types.LOAD_RESOURCE_DATA_SUCCESS: {
      const selectedResourceIds = getQueryResources();
      const selectedResources = [];

      selectedResourceIds.forEach(selectedResourceId => {
        action.resources.forEach(resource => {
          if (resource.id === selectedResourceId) {
            selectedResources.push(resource);
          }
        });
      });

      return [...state, ...selectedResources];
    }
    case types.ADD_SAVED_RESOURCE:
      return [...state, action.savedResource];
    case types.REMOVE_SAVED_RESOURCE:
      return state.filter(
        resource => action.savedResourceIndex !== resource.id
      );
    case types.CLEAR_SAVED_RESOURCES:
      return [];
    default:
      return state;
  }
}

export default {
  resources: resourcesReducer,
  isFetchingResource: isFetchingResourceReducer,
  categories: categoriesReducer,
  filteredResources: filteredResourcesReducer,
  searchedResources: searchedResourcesReducer,
  savedResources: savedResourcesReducer,
};
