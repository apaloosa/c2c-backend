
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


module.exports.getLocation = getLocation;
