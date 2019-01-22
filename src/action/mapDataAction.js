import * as types from './actionType';

const groupResourcesByCoordinatesStart = () => ({ type: types.GROUP_RESOURCE_BY_COORDINATES_START })
const groupResourcesByCoordinatesSuccess = (resources) => ({
    type: types.GROUP_RESOURCE_BY_COORDINATES_SUCCESS,
    resources
})

export function groupResourcesByCoordinates(resources) {
    return function (dispatch) {
        dispatch(groupResourcesByCoordinatesStart());
        return dispatch(groupResourcesByCoordinatesSuccess(resources));
    }
}