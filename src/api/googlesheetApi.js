import Tabletop from 'tabletop';

function normalizeHeaders(element) {
  element.name = element.name;
  if (element.serviceprovided) {
    element.tags = String(element.serviceprovided).split(', ');
  }
  element.twitterUrl = element.twitterurl;
  element.facebookUrl = element.facebookurl;
  element.instagramUrl = element.instagramurl;
  element.hashCoordinates = element.latitude + element.longitude;
  if (element.latitude && element.longitude) {
    element.coordinates = {
      lat: parseFloat(element.latitude),
      lng: parseFloat(element.longitude),
    };
  }
  if (element.categoryautosortscript) {
    element.categories = element.categoryautosortscript;
  } else {
    element.categories = element.categories;
  }
  if (element.city || element.address || element.state || element.zipcode) {
    element.location = element.combinedaddress;
  }
}

export const getAllResources = resourceSheetId => new Promise(((resolve, reject) => {
  Tabletop.init({
    key: resourceSheetId,
    simpleSheet: false,
    prettyColumnNames: false,
    postProcess: normalizeHeaders,
    callback: (data, tabletop) => {
      const resource = tabletop.sheets('Data').elements;
      const filteredResource = resource.filter(resource => resource.truefalsevetting === 'TRUE');
      resolve(filteredResource);
    },
  });
}));
