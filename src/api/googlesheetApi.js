import Tabletop from 'tabletop';
import {getAllSites} from '../api/directoryGoogleSheets';

const envSheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID
const revereSheetId = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

function normalizeHeaders(element) {
  element["name"] = element["name"];
  element["tags"] = String(element["serviceprovided"]).split(", ");
  element["twitterUrl"] = element["twitterurl"];
  element["tags"] = String(element["serviceprovided"]);
  element["facebookUrl"] = element["facebookurl"];
  element["instagramUrl"] = element["instagramurl"];
  element["hashCoordinates"] = element["latitude"] + element["longitude"];
  if (element["latitude"] && element["longitude"]) {
    element["coordinates"] = { lat: parseFloat(element["latitude"]), lng: parseFloat(element["longitude"]) }
  }

  if (element.city || element.address || element.state || element.zipcode) {
    // element.location = element.address+ " " + element.city + ", " + element.state + " " + element.zipcode;
    element.location = element["combinedaddress"];
  } else {
    element.location = "";
  }

}

function sheetIdFromPath(directory, path){
  for (var i=0; i < directory.length; i++) {
      if (directory[i].path === path) {
          return directory[i].sheetId;
      }
  }
}

export let getAllResources = (resourcePath) => new Promise(function(resolve, reject){
  getAllSites.then(sites => {
    const resourceSheetId = sheetIdFromPath(sites, resourcePath) || envSheetId || revereSheetId;
    if(resourceSheetId == null){
      alert("Error: Unable to find resource '" + resourcePath + "'");
    }

    Tabletop.init({
      key: resourceSheetId,
      simpleSheet: false,
      prettyColumnNames: false,
      postProcess: normalizeHeaders,
      callback: (data, tabletop) =>{
        let resource = tabletop.sheets("Data").elements;
        let filteredResource = resource.filter(function (resource) { return resource.truefalsevetting === 'TRUE' });
        resolve(filteredResource);
        }
    });
  });
})