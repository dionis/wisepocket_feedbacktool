/**
 * Created by Dionis on 14/05/2017.
 */
var request = require('supertest');

const assert = require('assert');
const salis = require('sails');;
const fs = require('fs');
var path = require('path');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
var appRoot = require('app-root-path');
const pathToFile = 'test'+ path.sep + 'fixtures'+ path.sep
describe('UploadWebReviewController', function() {
  describe('#Upload', function() {
    it('available OK', function (done) {

      Campaing.find({}).limit(1).then( function (campainInfo){

        var campaingdata = {
          campaingid: campainInfo[0].numcamp
        };
    
      request(sails.hooks.http.app)
        .get('/review/available-opinioninsert')
        .query(campaingdata)
        .expect(200, function (err, res) {
          if (err) return done(err);
           //if campaing exist in opionion module
          assert.equal("OK", res.body.mssg);
          done()
        })

      })
    });

    it('available ERROR', function (done) {
      try{
      request(sails.hooks.http.app)
        .get('/review/available-opinioninsert')
        .expect(400, function (err, res) {
          // if (err) return done(err);
          // assert.equal("ERROR", res.body);
          done()
        })
      }catch(err){
        assert.equal(err.code, 'E_MISSING_OR_INVALID_PARAMS')
        assert.equal(err.problems[0], '"campaingid" is required, but it was not defined.')
        done()
      }
    });

    it('upload ERROR', function (done) {

      var parser = new xml2js.Parser({trim: true});
      try{
      fs.readFile( appRoot + path.sep + pathToFile +  path.sep+'WifiExampleMessage.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
          // console.log(util.inspect(result, false, null))
          //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

          //Datos de una informacion
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
          assert.equal(3, result.update.informations[0].info.length);
         
          request(sails.hooks.http.app)
            .get('/review/available-opinioninsert')
            .expect(400, function (err, res) {  
              done()           
            })
              
      });
    });
  }catch(err){
    assert.equal(err.code, 'E_MISSING_OR_INVALID_PARAMS')
    assert.equal(err.problems[0], '"campaingid" is required, but it was not defined.')
    done()
  }  
  })




    // });

    it('upload ERROR not file', function (done) {
      var parser = new xml2js.Parser({trim: true});
      try{
      fs.readFile(appRoot + path.sep + pathToFile +  path.sep+ 'WifiExampleMessage.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
          // console.log(util.inspect(result, false, null))
          //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

          //Datos de una informacion
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
          assert.equal(3, result.update.informations[0].info.length);

          request(sails.hooks.http.app)
          .get('/review/available-opioninsert')
          .query({file:null})
          .expect(400, function (err, res) {  
            done()           
          })          
        });    
      });
    }catch(err){
      assert.equal(err.code, 'E_MISSING_OR_INVALID_PARAMS')
      assert.equal(err.problems[0], '"campaingid" is required, but it was not defined.')
      done()
    }  
    });

    it('upload ERROR JSON empty', function (done) {
      var parser = new xml2js.Parser({trim: true});
      try{
      fs.readFile(appRoot + path.sep + pathToFile +  path.sep+'WifiExampleMessage.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
          // console.log(util.inspect(result, false, null))
          //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

          //Datos de una informacion
          //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
          assert.equal(3, result.update.informations[0].info.length);

          request(sails.hooks.http.app)
            .get('/review/available-opioninsert')
            .query({})
            .expect(400, function (err, res) {
               done()
            })

        });
      });
      }catch(err){
      assert.equal(err.code, 'E_MISSING_OR_INVALID_PARAMS')
      assert.equal(err.problems[0], '"campaingid" is required, but it was not defined.')
      done()
     }  
    });

    it('upload ERROR JSON with diferent data', function (done) {
      var parser = new xml2js.Parser({trim: true});
      var diferentData="fasfasdfasrb3rwdfasdasdasdav";
      try{
        fs.readFile(appRoot + path.sep + pathToFile +  path.sep+'WifiExampleMessage.xml','utf-8', function (err, data) {
        request(sails.hooks.http.app)
          .post('/review/available-opioninsert')
          .query({datafile:diferentData})
          .expect(400, function (err, res) {
            done()
         })
      });
    }catch(err){
      assert.equal(err.code, 'E_MISSING_OR_INVALID_PARAMS')
      assert.equal(err.problems[0], '"campaingid" is required, but it was not defined.')
      done()
     }  
    });
  });

 describe('#Download', function() {

    // it('upload ERROR', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', function (err, data) {
    //     parser.parseString(data, function (err, result) {
    //       // console.log(util.inspect(result, false, null))
    //       //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

    //       //Datos de una informacion
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
    //       assert.equal(3, result.update.informations[0].info.length);

    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .expect(200, function (err, res) {
    //           if (err) return done(err);

    //           assert.equal("ERROR", res.body);
    //           done()
    //         })

    //     });
    //   });




    // });

    // it('upload ERROR not file', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', function (err, data) {
    //     parser.parseString(data, function (err, result) {
    //       // console.log(util.inspect(result, false, null))
    //       //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

    //       //Datos de una informacion
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
    //       assert.equal(3, result.update.informations[0].info.length);

    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({file:null})
    //         .expect(200, function (err, res) {
    //           if (err) return done(err);

    //           assert.equal("ERROR", res.body);
    //           done()
    //         })

    //     });
    //   });
    // });

    // it('upload ERROR JSON empty', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', function (err, data) {
    //     parser.parseString(data, function (err, result) {
    //       // console.log(util.inspect(result, false, null))
    //       //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

    //       //Datos de una informacion
    //       //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
    //       assert.equal(3, result.update.informations[0].info.length);

    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({})
    //         .expect(200, function (err, res) {
    //           if (err) return done(err);

    //           assert.equal("ERROR", res.body);
    //           done()
    //         })

    //     });
    //   });
    // });

    // it('upload ERROR JSON with diferent data', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   var diferentData="fasfasdfasrb3rwdfasdasdasdav";
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml','utf-8', function (err, data) {
    //     request(sails.hooks.http.app)
    //       .post('/uploadata')
    //       .send({datafile:diferentData})
    //       .expect(200, function (err, res) {
    //         if (err) return done(err);

    //         assert.equal("ERROR", res.body);
    //         done()
    //       })
    //   });
    // });

    // it('upload OK', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   //__dirnamen

    //   fs.readFile("" +  pathToFile + '/WifiExampleMessage.xml', 'utf-8', function (err, data) {
    //     if (err)
    //       return done(err)
    //     else {
    //       //console.log("Valores a obtener " + JSON.stringify(data))
    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({file: data})
    //         .expect(200, function (err, res) {
    //           if (err)
    //             return done(err);

    //           ////Nota en este punto deberia devolver un xml con el identificador
    //           ////asociado a las opiniones si es un mismo tel
    //           var expected = "<EnLineaContigo><info id=\"45665\"></info><info id=\"45666\"></info><info id=\"45667\"></info></EnLineaContigo>"
    //           assert.equal(expected, res.body);
    //           done()
    //         })
    //     }
    //   });
    // });

    // it('upload ERROR', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', 'utf-8', function (err, data) {
    //     if (err)
    //       return done(err)
    //     else {
    //       //console.log("Valores a obtener " + JSON.stringify(data))
    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({file:null})
    //         .expect(200, function (err, res) {
    //           if (err)
    //             return done(err);

    //           ////Nota en este punto deberia devolver un xml con el identificador
    //           ////asociado a las opiniones si es un mismo tel
    //           assert.equal("ERROR", res.body);
    //           done()
    //         })
    //     }
    //   });
    // });

    // it('upload OK', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   //__dirnamen

    //   fs.readFile("" +  pathToFile + '/WifiExampleMessage.xml', 'utf-8', function (err, data) {
    //     if (err)
    //       return done(err)
    //     else {
    //       //console.log("Valores a obtener " + JSON.stringify(data))
    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({file: data})
    //         .expect(200, function (err, res) {
    //           if (err)
    //             return done(err);

    //           ////Nota en este punto deberia devolver un xml con el identificador
    //           ////asociado a las opiniones si es un mismo tel
    //           var expected = "<EnLineaContigo><info id=\"45665\"></info><info id=\"45666\"></info><info id=\"45667\"></info></EnLineaContigo>"
    //           assert.equal(expected, res.body);
    //           done()
    //         })
    //     }
    //   });
    // });

    // it('upload ERROR', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', 'utf-8', function (err, data) {
    //     if (err)
    //       return done(err)
    //     else {
    //       //console.log("Valores a obtener " + JSON.stringify(data))
    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({file:null})
    //         .expect(200, function (err, res) {
    //           if (err)
    //             return done(err);

    //           ////Nota en este punto deberia devolver un xml con el identificador
    //           ////asociado a las opiniones si es un mismo tel
    //           assert.equal("ERROR", res.body);
    //           done()
    //         })
    //     }
    //   });
    // });

    // it('upload ERROR not file parameter', function (done) {
    //   var parser = new xml2js.Parser({trim: true});
    //   fs.readFile("" + pathToFile + '/WifiExampleMessage.xml', 'utf-8', function (err, data) {
    //     if (err)
    //       return done(err)
    //     else {
    //       //console.log("Valores a obtener " + JSON.stringify(data))
    //       request(sails.hooks.http.app)
    //         .post('/uploadata')
    //         .send({val:data})
    //         .expect(200, function (err, res) {
    //           if (err)
    //             return done(err);

    //           ////Nota en este punto deberia devolver un xml con el identificador
    //           ////asociado a las opiniones si es un mismo tel
    //           assert.equal("ERROR", res.body);
    //           done()
    //         })
    //     }
    //   });
    // });

    it('upload ZIP file trew opinions', function (done) {

      ///Get Campaing id
      Campaing.find({}).limit(1).then( function (campainInfo){

        var campaingdata = {
          campaingid: campainInfo[0].numcamp
        };

      console.log("Address " + appRoot + path.sep + pathToFile +  'enlineapp.zip')
      request(sails.hooks.http.app)
        .post('/review/upload-opinion')
        .field(campaingdata)
        .attach('uploadedfile', appRoot + path.sep + pathToFile + 'enlineapp.zip')        
        .expect(200, function (err, res) {
          if (err)
            return done(err);

          console.log("########################################################################")
          ////Nota en este punto deberia devolver un xml con el identificador
          ////asociado a las opiniones si es un mismo tel
          assert.equal("OK", res.body.status);
          //console.log(res.body.files);
          request(sails.hooks.http.app)
              .get('/review/count-all-opinion')
              .query({ 
                page:0,
                len:20,
                campaingid:234,
                initialDate:'2020-02-23 20:34',
                finalDate:'2020-03-10 06:34'
              })
              .expect(200, function (err, res) {                  
                  if (err) return done(err);      
                  console.log("======= Count all opinion =====")     
                  console.log(JSON.stringify(res.body))
                  assert.equal("OK",res.body.mssg) 
                  assert.equal(true,res.body.reviews > 0 ) 
                  done() 
              });
         
          //done()
        })
      })
    });

    it('upload ZIP file Single opinion', function (done) {

      ///Get Campaing id
      Campaing.find({}).limit(1).then( function (campainInfo){

        var campaingdata = {
          campaingid: campainInfo[0].numcamp
        };

      console.log("Address " + appRoot + path.sep + pathToFile +  'singleOpinion.zip')
      request(sails.hooks.http.app)
        .post('/review/upload-opinion')
        .field(campaingdata)
        .attach('uploadedfile', appRoot + path.sep + pathToFile + 'singleOpinion.zip')        
        .expect(200, function (err, res) {
          if (err)
            return done(err);

          console.log("########################################################################")
          ////Nota en este punto deberia devolver un xml con el identificador
          ////asociado a las opiniones si es un mismo tel
          assert.equal("OK", res.body.status);
          //console.log(res.body.files);
          request(sails.hooks.http.app)
              .get('/review/count-all-opinion')
              .query({ 
                page:0,
                len:20,
                campaingid:234,
                initialDate:'2020-02-23 20:34',
                finalDate:'2020-03-10 06:34'
              })
              .expect(200, function (err, res) {                  
                  if (err) return done(err);      
                  console.log("======= Count all opinion =====")     
                  console.log(JSON.stringify(res.body))
                  assert.equal("OK",res.body.mssg) 
                  assert.equal(true,res.body.reviews > 0 ) 
                  done() 
              });
         
          //done()
        })
      })
    });
  })  
});