/* eslint-disable no-param-reassign */
import Tabletop from "tabletop";

function normalizeHeaders(element) {
  if (element.serviceprovided) {
    element.tags = String(element.serviceprovided).split(", ");
  }
  element.twitterUrl = element.twitterurl;
  element.facebookUrl = element.facebookurl;
  element.instagramUrl = element.instagramurl;
  element.hashCoordinates = element.latitude + element.longitude;
  if (element.latitude && element.longitude) {
    element.coordinates = {
      lat: parseFloat(element.latitude),
      lng: parseFloat(element.longitude)
    };
  }

  if (element.categoryautosortscript) {
    element.categories = element.categoryautosortscript;
  }

  if (element.city || element.address || element.state || element.zipcode) {
    element.location = element.combinedaddress;
  }
}

const getAllResources = resourceSheetId =>
  new Promise(resolve => {
    Tabletop.init({
      key: resourceSheetId,
      simpleSheet: false,
      prettyColumnNames: false,
      postProcess: normalizeHeaders,
      callback: (data, tabletop) => {
        const resource = tabletop.sheets("Data").elements;

        const filteredResource = resource.filter(
          resourceData => resourceData.truefalsevetting === "TRUE"
        );
        resolve(filteredResource);
      }
    });
  });
export default getAllResources;
