var extend = require('../lib/util').extend;
var merge = require('../lib/util').merge;


var tree = tree || require('../config/cattree.json');

function getLocation(location, recurse){

  var ret = tree[location] || {};

  if(recurse !== undefined && !recurse){
    return ret;
  }

  var path = location.split('.');
  while(path.length > 0){
    path.shift();
    location = path.join('.');
    if(tree.hasOwnProperty(location)){
      ret = merge(ret, tree[location]);
    }
  }

  return ret;
}

function isValid(location, category){
  var categories = getLocation(location);

  var path = category.split('.');
  for(var i = 0; i < path.length; i++){
    categories = categories[path[i]];
    if(categories === undefined){
      return false;
    }
  }
  return true;
}


module.exports.getLocation = getLocation;
module.exports.isValid = isValid;
