import Tabletop from 'tabletop';

var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

Tabletop.init({
  key: revere_key,
  simpleSheet: false,
  prettyColumnNames: false,
  callback: getResourceData
});

function getResourceData(data, tabletop){
    return new Promise((resolve, reject) => {
      resolve(Object.assign({}, tabletop.sheets("Data").elements));
    });
}

export default {getResourceData};