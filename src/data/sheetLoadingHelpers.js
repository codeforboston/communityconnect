import Tabletop from 'tabletop';
import { find_in_object, update_criteria, criteria_list } from '../utils/FilterHelper.js';

function normalizeHeaders(element) {
  element["name"] = element["name"];
  element["id"] = element["rowNumber"];
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

      var my_json = JSON.stringify(data);

      if (selected.length > 0 && filterType == "category") {
        filter_criteria_list = update_criteria(selected, filter_criteria_list);
      }        

      filtered_json = filter_criteria_list.length <= 0 ? data : find_in_object(JSON.parse(my_json), { categoryautosortscript: filter_criteria_list });

      if (selected.length > 0 && filterType == "name") {
        filtered_json = filtered_json.filter(function (i) {
          return i.name.toLowerCase().match(selected.toLowerCase());
        });
      }

      filtered_json = filtered_json.filter(function (org) { return org.truefalsevetting === 'TRUE' });

      filtered_json.forEach(obj => { obj.isMarkerOpen = false; });

      //console.log(filtered_json)

      this.setState({
        orgs: filtered_json,
        categories: categoryList,
        tags: Object.keys(tags)
      });

    }
  });
}