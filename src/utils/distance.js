
export const getDistance = (targetLocation, myLocation) => {
  // return undefined if we are missing either coordinate
  if(!targetLocation.coordinates || !myLocation.coordinates) {
    return;
  }

  // haversine formula is used
  // https://www.movable-type.co.uk/scripts/latlong.html
  const DEGREES_TO_RADIANS = degrees => degrees * Math.PI / 180;
  const RADIUS_OF_EARTH = 6371000;

  // convert degrees to radians
  let latTargetLocation = DEGREES_TO_RADIANS(targetLocation.coordinates.lat);
  let latMyLocation = DEGREES_TO_RADIANS(myLocation.coordinates.lat);

  // calculate changes in latitude and longitude
  let changeInLat  = DEGREES_TO_RADIANS(myLocation.coordinates.lat - targetLocation.coordinates.lat);
  let changeInLong =  DEGREES_TO_RADIANS(myLocation.coordinates.lng - targetLocation.coordinates.lng);

  // a is the square of half the chord length between the points
  let a = Math.pow(Math.sin(changeInLat/2), 2) + Math.cos(latTargetLocation) * Math.cos(latMyLocation) * Math.pow(Math.sin(changeInLong/2), 2);

  // c is angular distance in radians
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distanceInMeters = RADIUS_OF_EARTH * c;

  const NUM_OF_METERS_IN_ONE_MILE = 1609.34;
  const METERS_TO_MILES = meters => meters / NUM_OF_METERS_IN_ONE_MILE;

  // convert meters to miles and set to two decimal points
  let distanceInMiles = +(METERS_TO_MILES(distanceInMeters)).toFixed(2);

  return distanceInMiles;
}
