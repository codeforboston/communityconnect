import Tabletop from 'tabletop';


var communityConnectKey = '1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA';

var resource = Tabletop.init({ 
  key: communityConnectKey, 
  callback: showInfo 
})

export function showData(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], resource));
    });
  });
}
