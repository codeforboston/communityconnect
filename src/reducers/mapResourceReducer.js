import * as types from '../action/actionType';
import initialState from './initialState';

export function mapResource(state = initialState.mapResource, action) {
    console.log("Map reducer: ", action);
    switch (action.type) {
        case types.GROUP_RESOURCE_BY_COORDINATES_SUCCESS:
        var locationArray = [];
        this.props.resource.forEach(function (resource) {
          locationArray[resource.hashCoordinates] = locationArray[resource.hashCoordinates] || [];
          locationArray[resource.hashCoordinates].push(resource);
        });
        console.log("Reducer array: ", locationArray);
            return Object.assign([], state, locationArray);
        default: return state;
    }
}