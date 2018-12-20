
export const getDistance = (targetLocation, myLocation) => {
  // return undefined if we are missing either coordinate
  if(!targetLocation.coordinates || !myLocation.coordinates) {
    return;
  }

  // haversine formula is used
  // https://www.movable-type.co.uk/scripts/latlong.html
  const degreesToRadians = degrees => degrees * Math.PI / 180;
  const RADIUS_OF_EARTH = 6371000;

  // convert degrees to radians
  const latTargetLocation = degreesToRadians(targetLocation.coordinates.lat);
  const latMyLocation = degreesToRadians(myLocation.coordinates.lat);

  // calculate changes in latitude and longitude
  const changeInLat  = degreesToRadians(myLocation.coordinates.lat - targetLocation.coordinates.lat);
  const changeInLong =  degreesToRadians(myLocation.coordinates.lng - targetLocation.coordinates.lng);

  // a is the square of half the chord length between the points
  const a = Math.pow(Math.sin(changeInLat/2), 2) + Math.cos(latTargetLocation) * Math.cos(latMyLocation) * Math.pow(Math.sin(changeInLong/2), 2);

  // c is angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInMeters = RADIUS_OF_EARTH * c;

  const NUM_METERS_IN_ONE_MILE = 1609.34;
  const metersToMiles = meters => meters / NUM_METERS_IN_ONE_MILE;

  // convert meters to miles and set to two decimal points
  let distanceInMiles = +(metersToMiles(distanceInMeters)).toFixed(2);

  return distanceInMiles;
}
