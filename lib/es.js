var request = require('request');
var extend = require('../lib/util').extend;

/**
@Module ES (elastic search client)
*/

//Helper functions

function validate(doc){
  return true;
}



/**
@class esClient
*/
function ESClient(){
  var that = {
      host: 'localhost',
      port : 9200,
      indexType : 'default_index_type',
      index : 'default_index',
      options : {
          'timeout' : 200,
          'User-Agent' : 'c2c-backend'
      }
  };

  function baseUrl(){
    return 'http://'+that.host+':'+that.port+'/'+that.index+'/'+that.indexType+'/';
  }


  that.get = function get(id, cb){
    var options = extend(that.options);
    options.url = baseUrl()+id;
    request(options, function(err, res, body){
      var defaultError = {
        'message' : 'Internal server Error',
        'status' : 500,
        'error' : err
      };

      if(err){
        return cb(defaultError);
      }

      var status = Math.floor(res.statusCode / 100);
      if(!err && status == 2){
        return cb(null, JSON.parse(body));
      }

      defaultError.message = 'Unexpected Error';
      defaultError.status = res && res.statusCode;
      defaultError.error = err;

      cb(defaultError, null);
    });
  };

  that.remove = function remove(id, cb){
    var options = extend(that.options);
    options.url = baseUrl()+id;
    options.method = 'DELETE';

    request(options, function(err, res, body){
      var ret = {
        'message' : 'Unexpected Error',
        'status' : res && res.statusCode,
        'error' : err
      };

      if(err){
        return cb(err);
      }
      var status = Math.floor(res.statusCode / 100);
      if(status == 2){
        return cb(null, body);
      }

      ret.status = res.statusCode;
      cb(ret, body);
    });
  };

  that.removeIndex = function remove(cb){
    var options = extend(that.options);
    options.url = baseUrl();
    options.method = 'DELETE';

    request(options, function(err, res, body){
      if(err){
        return cb(err, null);
      }
      var status = Math.floor(res.statusCode / 100);
      if(status == 2){
        return cb(null, body);
      }
      cb(body, null);
    });
  };

  that.post = function post(ad, cb){
    if( !validate(ad) ){
      return cb('Ad is not valid');
    }

    var options = extend(that.options);
    options.uri = baseUrl();
    options.method = 'POST';
    options.json = ad;

    request(options, function(err, res, body){
      if(err){
        return cb(err);
      }
      var status = Math.floor(res.statusCode / 100);
      if (!err && status == 2) {
        return cb(null, body);
      }
      return cb(err,null);
    });
  };

  that.put = function put(id, ad, cb){
    if( !validate(ad) ){
      return cb('Ad is not valid');
    }

    var options = extend(that.options);
    options.uri = baseUrl()+id;
    options.method = 'PUT';
    options.json = ad;

    request(options, function(err, res, body){
      var ret = {
        message : 'Unexpected Error',
        status : res && res.statusCode,
        error: err
      };

      if(err){
        return cb(ret);
      }
      var status = Math.floor(res.statusCode / 100);
      if (!err && status == 2) {
        return cb(null, body);
      }

      return cb(ret,body);
    });
  };

  return that;
}

module.exports.es = ESClient;
