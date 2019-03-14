import Tabletop from 'tabletop';

const REVERE_KEY = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

function normalizeHeaders(element) {
  element['name'] = element['name'];
  element['tags'] = String(element['serviceprovided']).split(', ');
  element['twitterUrl'] = element['twitterurl'];
  element['tags'] = String(element['serviceprovided']);
  element['facebookUrl'] = element['facebookurl'];
  element['instagramUrl'] = element['instagramurl'];
  element['hashCoordinates'] = element['latitude'] + element['longitude'];
  if (element['latitude'] && element['longitude']) {
    element['coordinates'] = {
      lat: parseFloat(element['latitude']),
      lng: parseFloat(element['longitude']),
    };
  }

  if (element.city || element.address || element.state || element.zipcode) {
    element.location = element['combinedaddress'];
  } else {
    element.location = '';
  }
}

export const getAllResources = new Promise(function(resolve, reject) {
  Tabletop.init({
    key: REVERE_KEY,
    simpleSheet: false,
    prettyColumnNames: false,
    postProcess: normalizeHeaders,
    callback: (data, tabletop) =>{
      const resource = tabletop.sheets('Data').elements;
      const filteredResource = resource.filter(function(resource) {
        return resource.truefalsevetting === 'TRUE';
      });
      resolve(filteredResource);
    },
  });
});

