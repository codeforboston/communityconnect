import Tabletop from 'tabletop';

var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

export var promise = new Promise(function(resolve, reject){
  Tabletop.init({
    key: revere_key,
    simpleSheet: false,
    prettyColumnNames: false,
    callback: (data, tabletop) =>{
      resolve(tabletop.sheets("Data").elements);
    }
  });
})

