import Tabletop from 'tabletop';


var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

Tabletop.init({
    key: revere_key,
    simpleSheet: true,
    prettyColumnNames: false,
    callback: showInfo
    }
  );

export function showInfo(data, tabletop) {
    console.log("Show data: ", tabletop.sheets("Data").elements);
  }