var extend = require('./util').extend;
var logger = require('log4js').getLogger('ad');

function AdDAO(options){
  var that = {};

  if(options && options.es){
    that.es = options.es;
  }
  else{
    that.es = require('../lib/es').es();
    that.es.index = 'ad';
    that.es.indexTypte = 'ads';
  }

  logger.info('Using index '+that.es.index+
            ' and indexType '+that.es.indexType);

  that.verify = function verify(ad){
    if(!ad){
      logger.error('')
      throw Error('Ad does not exist');
    }

    if(!ad.title || typeof(ad.title) != 'string' ){
      throw Error('An ad should have a title');
    }

    if(ad.title.length < 10){
      throw Error('Title should have at least 10 characters');
    }

  };

  that.add = function post(ad, cb){
    that.verify(ad);
    that.es.post(ad, function(err, data){
      if(err){
        return cb(err);
      }
      var ret = extend(ad);
      ret.id = data._id;
      cb(null, ret);
    });
  };

  that.get = function get(ad_id, cb){
    that.es.get(ad_id, function(err, data){
      if(err){
        return cb(err, null);
      }

      var ad = extend(data._source);
      ad.id = data._id;
      return cb(null, ad);
    });
  };

  that.update = function put(ad_id, ad, cb){
    that.verify(ad);
    that.es.put(ad_id, ad, function(err, data){
      if(err){
        return cb(err, null);
      }
      var ret_ad = extend(ad);
      ret_ad.id = ad_id;

      cb(null, ret_ad);
    });
  };

  that.remove = function remove(ad_id, cb){
    that.es.remove(ad_id, cb);
  };

  return that;
}

module.exports.ads = AdDAO;
