var expect = require("chai").expect;
var extend = require('../lib/util').extend;
var cattree = require('../lib/cattree');

describe('cattree', function(){
  describe('#get', function(){
    it('Should return a category tree related to a ' +
       'location and its parents', function(){
      var categories = cattree.getLocation('flores.caba.com.ar');

      expect(categories).to.exist;
      expect(categories).to.have.property('1');
      expect(categories).to.have.property('2');
      expect(categories).to.not.have.property('3');
      expect(categories).to.not.have.property('4');

      categories = cattree.getLocation('acasuso.bsas.com.ar');
      expect(categories).to.have.property('1');
      expect(categories).to.have.property('2');
      expect(categories).to.have.property('3');
      expect(categories).to.have.property('4');

    });

    it('Should return the category tree related to a location ' +
      'without it\'s parents if requested', function(){
      var categories = cattree.getLocation('bsas.com.ar', false);

      expect(categories).to.exist;
      expect(categories).to.not.have.property('1');
      expect(categories).to.not.have.property('2');
      expect(categories).to.have.property('3');
      expect(categories).to.have.property('4');

      categories = cattree.getLocation('acasuso.com.ar', false);
      expect(categories).to.be.empty.object;

    });

    it('Should check if a pair location / category are valid or not', function(){
      var isValid = cattree.isValid("bsas.com.ar", "1.1");
      expect(isValid).to.be.true;

      isValid = cattree.isValid('bsas.com.ar', '3.1');
      expect(isValid).to.be.false;
    });
  });
});
