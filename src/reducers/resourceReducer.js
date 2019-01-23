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

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export function mapResource(state = initialState.mapResource, action) {
    switch (action.type) {
        case types.GROUP_RESOURCE_BY_COORDINATES_SUCCESS:
            var locationArray = [];
            action.resources.forEach(function (resource) {
                if (!locationArray[resource.hashCoordinates]) {
                    locationArray[resource.hashCoordinates] = {
                        coordinates: resource.coordinates,
                        groupedResource: [],
                        showInfo: false
                    }
                }
                locationArray[resource.hashCoordinates].groupedResource.push(resource);
            }
            );
            /*var locationArray = Object.values(action.resources.reduce((result, {
                id,
                coordinates,
                combinedaddress,
                name,
                phone
            }) => {
                // Create new group
                if (!result[coordinates]) result[coordinates] = {
                    coordinates,
                    isOpen: false,
                    data : []
                };
                // Append to group
                result[coordinates].data.push({
                    id,
                    coordinates,
                    combinedaddress,
                    name,
                    phone
                });
                return result;
            }, {}));*/
            const groupedLocation = groupBy(action.resources, resource => resource.hashCoordinates);
            console.log("Grouped locations: ", groupedLocation);
            return Object.assign({}, state, locationArray);
        default: return state;
    }
}

