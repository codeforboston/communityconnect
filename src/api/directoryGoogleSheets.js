/* eslint-disable no-param-reassign */
import Tabletop from "tabletop";

const directoryKey = "1X3FsZ_sOjyROQER3-ywqObQW8sjV5kHNhdRdTR8DTc4";

function normalizeHeaders(element) {
  element.path = element.whatdoyouwantyourpathtobe;
  element.title = element.whatisyourorganizationname;
  element.sheetId = element.whatisyourgooglesheetid;
}

const getAllSites = new Promise(resolve => {
  Tabletop.init({
    key: directoryKey,
    simpleSheet: false,
    prettyColumnNames: false,
    postProcess: normalizeHeaders,
    callback: (data, tabletop) => {
      const directory = tabletop.sheets("data").elements;
      resolve(directory);
    }
  });
});

export default getAllSites;
