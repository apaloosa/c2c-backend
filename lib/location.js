var extend = require('./util').extend;
var locationTree = locationTree || require('../config/location.json');

function getLocation(location){
  var ret = [];
  var path = location.split('.');
  var current = locationTree;

  for(var i = path.length -1; i >= 0; i--){
    current = current[path[i]];
    if(current === undefined){
      return null;
    }
    ret.push(path[i]);
  }
  return ret;
}

function getLocationObject(path){
  var current = locationTree;
  path.forEach(function(v){
    current = current[v];
    if(current === undefined )
      return null;
  });
  return extend(current);
}

function getChildren(location){
  var path = getLocation(location);

  if(path === null){
    return null;
  }

  return getLocationObject(path);
}

function getParent(location){
  var path = getLocation(location);

  if(path === null){
    return null;
  }

  path.pop();

  var ret = {};
  ret[extend(path).reverse().join('.')] =  getLocationObject(path);
  return ret;
}


module.exports.getLocation = getLocation;
module.exports.getChildren = getChildren;
module.exports.getParent = getParent;
