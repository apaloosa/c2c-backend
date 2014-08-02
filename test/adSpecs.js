var expect = require("chai").expect;
var adModule = require('../lib/ad');
var extend = require('../lib/util').extend;

describe('ad', function(){
  describe('#verify', function(){
    it('Should fail if has not title', function(){
      var ad = {};
      var err = undefined;
      try{
        adModule.verify(ad);
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
        adModule.verify(ad);
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
        adModule.verify(ad);
      }catch(ex){
        err = ex;
      }
      expect(err).to.not.exist;
    });

  });


  describe('#post', function(){
    it('Should return the ad with the id', function(done){
      var ad = {
        'title' : 'The white rabbit runs!'
      };
      adModule.post(ad, function(err, final_ad){
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
      adModule.post(ad, function(err, retrieved_ad){
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

      adModule.post(ad, function(err, data){

        var copy_ad = extend(ad);
        copy_ad.title = 'Have chaged';
        copy_ad.id = data.id;

        adModule.put(copy_ad.id, copy_ad, function(err, final_ad){
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

      adModule.post(ad, function(err, data){
        adModule.remove(data.id, function(err, data){
          adModule.get(data._id, function(err, data){
            expect(err).to.exist;
            done();
          });
        });
      });
    });
  });

});
