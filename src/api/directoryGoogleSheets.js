import Tabletop from 'tabletop';

const directoryKey = '1X3FsZ_sOjyROQER3-ywqObQW8sjV5kHNhdRdTR8DTc4';

function normalizeHeaders (element) {
  element['path'] = element['whatdoyouwantyourpathtobe'];
  element['title'] = element['whatisyourorganizationname'];
  element['sheetId'] = element['whatisyourgooglesheetid'];
}

export const getAllSites = new Promise(function (resolve, reject) {
  Tabletop.init({
    key: directoryKey,
    simpleSheet: false,
    prettyColumnNames: false,
    postProcess: normalizeHeaders,
    callback: (data, tabletop) => {
      const directory = tabletop.sheets('data').elements;
      resolve(directory);
    },
  });
});
