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

export let getAllCategories = new Promise(function(resolve, reject){
  Tabletop.init({
    key: revere_key,
    simpleSheet: false,
    prettyColumnNames: false,
    callback: (data, tabletop) =>{
      let resource = tabletop.sheets("Data").elements;
      const categories = {};

      for (let project of resource) {
        let category = project.categoryautosortscript.split(',');
        category.forEach(cat => categories[cat] = cat.trim());
      }
      
      const categoryList = [...(new Set(Object.values(categories)))];
      let index = categoryList.indexOf("");
      if (index > -1) {
        categoryList.splice(index, 1);
     }
      
      resolve(categoryList);
    }
  });
})

