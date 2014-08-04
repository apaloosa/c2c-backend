function extend(obj){
  return JSON.parse(JSON.stringify(obj));
}

function merge(obj1, obj2){
  var ret = extend(obj1);
  if(obj2 === undefined){
    return ret;
  }
  Object.keys(obj2).forEach(function(v){
     ret[v] = extend(obj2[v]);
  });
  return ret;
}

module.exports.extend = extend;
module.exports.merge = merge;
