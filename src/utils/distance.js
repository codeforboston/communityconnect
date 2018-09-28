
export const getDistance = (a, b) => {
  if(!a.coordinates || !b.coordinates){
    return;
  }

  let radians = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const d2r = Math.PI / 180;
  var latA = radians(a.coordinates.lat);


  var latB = radians(b.coordinates.lat);


  var dlong  = radians(a.coordinates.lat - b.coordinates.lat);
  var dlat =  radians(b.coordinates.lng - b.coordinates.lng);

  var d = Math.pow(Math.sin( dlong/2.0), 2) + Math.cos(latA) * Math.cos(latB) * Math.pow(Math.sin(dlat/2.0), 2);

  var c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1-d));

  var c = c * 6371000

  return (.000621371 * c);


}
