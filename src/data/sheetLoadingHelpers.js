import Tabletop from 'tabletop';
import { find_in_object, update_criteria, criteria_list } from '../utils/FilterHelper.js';

function normalizeHeaders(element) {
  element["name"] = element["name"];
  element["tags"] = String(element["serviceprovided"]).split(", ");
  element["twitterUrl"] = element["twitterurl"];
  element["facebookUrl"] = element["facebookurl"];
  element["instagramUrl"] = element["instagramurl"];
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

function createMarkerId({lat, lng}){
  //console.log('createMarkerId ',  lat.toString(), lng.toString())
  return lat.toString() + lng.toString();
}

export function callSheets(selected = "", filterType = "") {
  let filter_criteria_list = [];
  let filtered_json = {};

  var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';
  Tabletop.init({
    key: revere_key,
    simpleSheet: true,
    prettyColumnNames: false,
    postProcess: normalizeHeaders,
    callback: (_data, tabletop) => {
      const categories = {};
      const tags = {};
      var data = tabletop.sheets("Data").elements;

      for (let project of data) {
        let category = project.categoryautosortscript.split(',');
        category.forEach(cat => categories[cat] = cat.trim());
        for (let tag of project.tags) { tags[tag] = "" };
      }

      const categoryList = [...(new Set(Object.values(categories)))];

        data = data.filter(function (org) { return org.truefalsevetting === 'TRUE' });

        data.forEach(obj => { obj.isMarkerOpen = false; });


      //This creates a hash table based for the lat and long of each loction.
      //This allows us to group all organizations at the same location together. 
      var locationAddressHashTable = {};

      Object.entries(data).forEach(([index,  org]) =>{

      if(org.coordinates){

        if(locationAddressHashTable.hasOwnProperty(createMarkerId(org.coordinates))){

            locationAddressHashTable[createMarkerId(org.coordinates)]['orgs'].push(index)

      } else {
          locationAddressHashTable[createMarkerId(org.coordinates)] = {'orgs': [index] , isOpen: false }
      }
      }})


        // This creates a copy of the list of the original organizations.
        // This allows for a list to be re-filtered when selecting categories.
        this.originalOrgs = data.slice();

      this.setState({
        locationAddressHashTable : locationAddressHashTable,
        orgs: data,
        tags: Object.keys(tags),
          categories: categoryList
      });

    }
  });
}
