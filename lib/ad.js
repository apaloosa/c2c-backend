var esModule = require('../lib/es');

var es = esModule();
es.index = 'ad';
es.indexType = 'ads';

function extend(obj){
  return JSON.parse(JSON.stringify(obj));
}

function verify(ad){
  if(!ad){
    throw Error('Ad does not exist');
  }

  if(!ad.title || typeof(ad.title) != 'string' ){
    throw Error('An ad should have a title');
  }

  if(ad.title.length < 10){
    throw Error('Title should have at least 10 characters');
  }

}

function post(ad, cb){

  verify(ad);
  es.post(ad, function(err, data){
    if(err){
      return cb(err);
    }
    var ret = extend(ad);
    ret.id = data._id;
    cb(null, ret);
  });
}

function get(ad_id, cb){
  es.get(ad_id, function(err, data){

    if(err){
      return cb(err, null);
    }

    var ad = extend(data._source);
    ad.id = data._id;
    return cb(null, ad);
  });
}

function put(ad_id, ad, cb){
  verify(ad);
  es.put(ad_id, ad, function(err, data){
    if(err){
      return cb(err, null);
    }
    var ret_ad = extend(ad);
    ret_ad.id = ad_id;

    cb(null, ret_ad);
  });
}

function remove(ad_id, cb){
  es.remove(ad_id, cb);
}

module.exports.verify = verify;
module.exports.post = post;
module.exports.get = get;
module.exports.put = put;
module.exports.remove = remove;
