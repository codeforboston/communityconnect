import Tabletop from 'tabletop';

function normalizeHeaders (element) {
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
  if (element['categoryautosortscript']) {
    element['categories'] = element['categoryautosortscript'];
  } else {
    element['categories'] = element['categories'];
  }

  if (element.city || element.address || element.state || element.zipcode) {
    element.location = element['combinedaddress'];
  } else {
    element.location = '';
  }
}

export const getAllResources = resourceSheetId =>
  new Promise(function (resolve, reject) {
    Tabletop.init({
      key: resourceSheetId,
      simpleSheet: false,
      prettyColumnNames: false,
      postProcess: normalizeHeaders,
      callback: (data, tabletop) => {
        const resource = tabletop.sheets('Data').elements;
        const filteredResource = resource.filter(function (resource) {
          return resource.truefalsevetting === 'TRUE';
        });
        resolve(filteredResource);
      },
    });
  });
