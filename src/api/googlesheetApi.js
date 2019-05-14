import Tabletop from 'tabletop';
import {getAllSites} from '../api/directoryGoogleSheets';

const envSheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID
const revereSheetId = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';
const resourcePath = 'revere'; // TODO: extract this from the URL

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

function sheetIdFromPath(directory, path) {
  if(!!path || path === ""){
    return;
  }

  const requestedSite = directory.find(function(site) {
    return site["path"] === path;
  });

  if(!!requestedSite){
    return;
  }
  return requestedSite["sheetId"];
}

export let getAllResources = new Promise(function(resolve, reject){
  getAllSites.then(sites => {
    const resourceSheetId = envSheetId || sheetIdFromPath(sites, resourcePath) || revereSheetId
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

