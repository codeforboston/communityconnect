import Tabletop from 'tabletop';

const revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

export let getAllResources = new Promise(function(resolve, reject){
  Tabletop.init({
    key: revere_key,
    simpleSheet: false,
    prettyColumnNames: false,
    callback: (data, tabletop) =>{
      let resource = tabletop.sheets("Data").elements;
      let filteredResource = resource.filter(function (resource) { return resource.truefalsevetting === 'TRUE' });
      resolve(filteredResource);
    }
  });
})

