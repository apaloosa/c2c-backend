var expect = require("chai").expect;
var extend = require('../lib/util').extend;
var location = require('../lib/location');

describe('location', function(){
  describe('#get', function(){
    it('Should return the path of a location', function(){

      var ret = location.getLocation('flores.caba.com.ar');
      expect(ret).to.exist;
      expect(ret[0]).to.equal('ar');
      expect(ret[1]).to.equal('com');
      expect(ret[2]).to.equal('caba');
      expect(ret[3]).to.equal('flores');

    });

    it('Should return null if the location doesn\'t exist', function(){
      ret = location.getLocation('impossible.caba.com.ar');
      expect(ret).to.not.exist;
    });
  });

  describe('#getChildren', function(){
    it('Should return the childs of a given location', function(){
      var ret = location.getChildren('bsas.com.ar');

      expect(ret).to.exist;
      expect(ret).to.have.property('sanisidro');
      expect(ret).to.have.property('moreno');
    });

    it('Should return null if the locations is invalid', function(){
      var ret = location.getChildren('impossible.com.ar');

      expect(ret).to.be.null;
    });

    it('Should return an empty object if the location doesn\'t have children',
       function(){
      var ret = location.getChildren('sanisidro.bsas.com.ar');

      expect(ret).to.be.empty.object;
    });
  });

  describe('#getParent', function(){
    it('Should return the parent of the given category', function(){
      var ret = location.getParent('sanisidro.bsas.com.ar');

      expect(ret).to.exist;
      expect(ret).to.have.property('bsas.com.ar');
    });
  });
});
