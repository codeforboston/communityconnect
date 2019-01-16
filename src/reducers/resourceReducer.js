import * as types from '../action/actionType';
import initialState from './initialState';

export function resource(state = initialState.resource, action) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], state, action.resource);
        default: return state;
    }
}

export function categories(state = initialState.categories, action) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            const categories = {};
            for (let data of action.resource) {
                let category = data.categoryautosortscript.split(',');
                category.forEach(cat => categories[cat] = cat.trim());
            }
            const categoryList = [...(new Set(Object.values(categories)))];
            let index = categoryList.indexOf("");
            if (index > -1) {
                categoryList.splice(index, 1);
            }

            return Object.assign([], state, categoryList);

        default:
            return state;
    }
}

export function filteredResource(state = initialState.filteredResource, action) {
    switch (action.type) {
        case types.LOAD_RESOURCE_DATA_SUCCESS:
            return Object.assign([], state, action.resource);
        case types.FILTER_RESOURCE_BY_CATEGORIES:
            return action.filteredResource;
        default:
            return state;
    }
}

export function savedResource(state = initialState.savedResource, action) {
    switch (action.type) {
        case types.ADD_SAVED_RESOURCE:
            return [
                ...state,
                Object.assign([], state, action.savedResource)
            ];
        case types.REMOVE_SAVED_RESOURCE:
            return state.filter(resource => action.savedResourceIndex !== resource.id);
        default:
            return state;
    }
}
