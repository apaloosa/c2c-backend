var expect = require("chai").expect;
var adModule = require('../lib/ad');
var extend = require('../lib/util').extend;
var esClient = require('../lib/es').es;

describe('ad', function(){
  var es = esClient();
  es.index = 'tmp_ad';
  es.indexType = 'tmp_ad';
  es.options.timeout = '2000';

  var options = {
    'es' : es
  };

  var ads = adModule.ads(options);

  after(function(done){
      es.removeIndex(function(err, data){
        if(err)
          throw err;
        done();
      });
  });

  describe('#verify', function(){
    it('Should fail if has not title', function(){
      var ad = {};
      var err = undefined;
      try{
        ads.verify(ad);
      }catch(ex) {
        err = ex;
      }
      expect(err).to.exist;

    });

    it('Should fail if title is not a string', function(){
      var ad = {
        'title' : {}
      };

      var err = undefined;
      try{
        ads.verify(ad);
      }catch(ex) {
        err = ex;
      }
      expect(err).to.exist;

    });

    it('Should have a title with some text', function(){
      var ad = {
        'title' : 'valid ad with title'
      };
      var err = undefined;
      try{
        ads.verify(ad);
      }catch(ex){
        err = ex;
      }
      expect(err).to.not.exist;
    });

  });


  describe('#add', function(){
    it('Should return the ad with the id', function(done){
      var ad = {
        'title' : 'The white rabbit runs!'
      };
      ads.add(ad, function(err, final_ad){
        expect(err).to.not.exist;
        expect(ad.title).to.equal(final_ad.title);
        expect(final_ad.id).to.exist;
        done();
      });
    });
  });

  describe('#get', function(){
    it('Should retrieve an ad when aksed', function(done){
      var ad = {
        'title' : 'The white rabbit runs!'
      };
      ads.add(ad, function(err, retrieved_ad){
        expect(retrieved_ad).to.exist;
        expect(retrieved_ad).to.have.property('title', ad.title);
        done();
      });
    });
  });

  describe('#put', function(){
    it('Should update a previous posted ad', function(done){
      var ad = {
        'title' : 'The white rabbit runs!'
      };

      ads.add(ad, function(err, data){

        var copy_ad = extend(ad);
        copy_ad.title = 'Have chaged';
        copy_ad.id = data.id;

        ads.update(copy_ad.id, copy_ad, function(err, final_ad){
          expect(final_ad).to.exist;
          expect(final_ad).to.have.property('title', copy_ad.title);
          expect(final_ad).to.deep.equal(copy_ad, final_ad);
          done();
        });
      });
    });
  });

  describe('#remove', function(){
    it('Should delete an alread posted ad', function(done){
      var ad = {
        'title' : 'The white rabbit runs!'
      };

      ads.add(ad, function(err, data){
        ads.remove(data.id, function(err, data){
          ads.get(data._id, function(err, data){
            expect(err).to.exist;
            done();
          });
        });
      });
    });
  });

});
