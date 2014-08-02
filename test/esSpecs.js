var expect = require("chai").expect;
var esClient = require('../lib/es');

describe('esDAO', function(){
  after(function(done){
      var es = esClient();
      es.removeIndex(function(err, data){
        if(err)
          throw err;
        //console.log('Index cleared'+JSON.stringify(data));
        done();
      });
  });

  describe('#post', function(){

    it('should post a new ad to the storage', function(done){
      var es = esClient();
      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };

      es.post(ad, function(err, data){
          expect(data).to.have.a.property('_id');
          expect(data).to.have.a.property('_type', 'default_index_type');
          expect(data).to.have.a.property('_index', 'default_index');
          expect(data).to.have.a.property('_version', 1);
          done();
      });
    });

    it('should fail if no ES instance is listenning', function(done){
      var es = esClient();
      es.port = 9201;

      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };
      es.post(ad, function(err, data){
        expect(err).to.be.not.null;
        expect(err).to.have.a.property('code', 'ECONNREFUSED');
        expect(data).to.not.exist;
        done();
      });
    });

    it('should fail if no response is received in 200 milliseconds', function(done){
      var es = esClient();
      es.port = 9201;

      var http = require('http');
      server = http.createServer();
      server.listen(9201);

      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };

      es.post(ad, function(err, data){
        expect(err).to.be.not.null;
        //expect(err).to.have.a.property('code', 'ETIMEDOUT');
        expect(data).to.not.exist;
        server.close();
        done();
      });
    });
  });

  describe('#get', function(){
    it('Should obtain an already posted document', function(done){
      var ad = {
       'title' : 'Days of glory',
       'director' : 'Some director',
       'year' : '1994'
      };

      var es = esClient();
      es.post(ad, function(err, data){
        //expect(err).to.be.null;
        //expect(data).to.be.not.null;

        es.get(data._id, function(err, ret){
            expect(data._id).to.equal(ret._id);
            expect(ad.title).to.equal(ret._source.title);
            done();
        });
      });
    });

    it('Should return an error if the document is not found', function(done){
        var es = esClient();
        es.get('invalid_id', function(err, ret){
          expect(err).to.exist;
          expect(ret).to.be.null;
          expect(err.status).to.equal(404);
          done();
        });
    });

    it('Should fail with 500 if the storage is not accessible', function(done){
      var es = esClient();
      es.port = 9201;
      es.get('invalid_id', function(err, ret){
          expect(err).to.exist;
          expect(ret).to.not.exist;
          expect(err.status).to.equal(500);
          done();
        });
    });

  });

  describe('#delete', function(){
    it('Should fail while trying to delete an unexisting document', function(done){
      var es = esClient();
      es.remove('invalid_id', function(err, data){
        expect(err).to.exist;
        expect(data).to.exist;
        expect(err).to.have.property('status', 404);
        done();
      });
    });

    it('Should succeed in removing an existing document', function(done){
      var es = esClient();
      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };

      es.post(ad, function(err, post_ret){
        es.remove(post_ret._id, function(err, ret){
          expect(err).to.not.exist;
          expect(ret).to.exist;

          es.get(post_ret._id, function(err, ret){
            expect(err).to.exist;
            done();
          });
        });
      });

    });
  });

  describe('#put', function(){

    it('Should update an already existing ad', function(done){
      var es = esClient();
      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };

      es.post(ad, function(err, post_ret){
        es.get(post_ret._id, function(err, ad){

          ad._source.title = 'Days of missery';

          es.put(ad._id, ad._source, function(err, put_ret){
            es.get(post_ret._id, function(err, final){
              expect(final._source.title).to.equal('Days of missery');
              done();
            });
          });
        });
      });
    });

    it('Should not fail trying to update a not existing document', function(done){
      var ad = {
        'title' : 'Days of glory',
        'director' : 'Some director',
        'year' : '1994'
      };

      var es = esClient();
      es.put('invalid_id', ad, function(err, data){
        expect(err).to.not.exist;
        expect(data).to.exist;
        expect(data).to.have.property('_id', 'invalid_id');
        done();
      });
    });
  });

});
