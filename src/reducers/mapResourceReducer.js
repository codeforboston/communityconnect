import * as types from '../action/actionType';
import initialState from './initialState';

export function mapResource(state = initialState.mapResource, action) {
    switch (action.type) {
        case types.GROUP_RESOURCE_BY_COORDINATES_SUCCESS:
        var locationArray = [];
        this.props.resource.forEach(function (resource) {
            if(!locationArray[resource.hashCoordinates]){
                locationArray[resource.hashCoordinates] = {
                    coordinates : resource.coordinates,
                    locations : []
                }
            }
            locationArray[resource.hashCoordinates].locations.push(resource);
          /*locationArray[resource.hashCoordinates] = locationArray[resource.hashCoordinates] || [];
          locationArray[resource.hashCoordinates].push(resource);*/
        });
            return Object.assign([], state, locationArray);
        default: return state;
    }
}