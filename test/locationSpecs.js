var expect = require("chai").expect;
var extend = require('../lib/util').extend;
var location = require('../lib/location');

describe('location', function(){
  describe('#get', function(){
    it('Should return the path of a location', function(){
      var ret = location.getLocation('flores.caba.com.ar');

      expect(ret).to.exist;
      console.dir(ret);
    });
  });
});
