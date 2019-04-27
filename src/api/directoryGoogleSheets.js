import Tabletop from 'tabletop';

const directory_key = '1X3FsZ_sOjyROQER3-ywqObQW8sjV5kHNhdRdTR8DTc4';

function normalizeHeaders(element) {
  let normalizedElement = {};
  normalizedElement["path"] = element["whatdoyouwantyourpathtobe"];
  normalizedElement["title"] = element["whatisyourorganizationname"];
  normalizedElement["sheetId"] = element["whatisyourgooglesheetid"];
  return normalizedElement;
}

export let getAllSites = new Promise(function(resolve, reject){
  Tabletop.init({
    key: directory_key,
    postProcess: normalizeHeaders,
    callback: (data, tabletop) =>{
      resolve(data);  
    }
  });
})

