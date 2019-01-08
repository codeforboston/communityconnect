import Tabletop from 'tabletop';

var revere_key = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

export var getAllResources = new Promise(function(resolve, reject){
  Tabletop.init({
    key: revere_key,
    simpleSheet: false,
    prettyColumnNames: false,
    callback: (data, tabletop) =>{
      resolve(tabletop.sheets("Data").elements);
    }
  });
})

export var getAllCategories = new Promise(function(resolve, reject){
  Tabletop.init({
    key: revere_key,
    simpleSheet: false,
    prettyColumnNames: false,
    callback: (data, tabletop) =>{
      var data = tabletop.sheets("Data").elements;
      const categories = {};

      for (let project of data) {
        let category = project.categoryautosortscript.split(',');
        category.forEach(cat => categories[cat] = cat.trim());
      }
      const categoryList = [...(new Set(Object.values(categories)))];
      resolve(categoryList);
    }
  });
})

