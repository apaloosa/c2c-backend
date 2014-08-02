function extend(obj){
  return JSON.parse(JSON.stringify(obj));
}

module.exports.extend = extend;
