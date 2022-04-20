/* eslint-disable no-undef */
/**
 * Created by Dionis on 14/05/2017.
 */
var request = require('supertest');

const assert = require('assert');
const salis = require('sails');
const fs = require('fs');
var path = require('path');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
var appRoot = require('app-root-path');
const pathToFile = 'test'+ path.sep + 'fixtures'+ path.sep;

/*
// eslint-disable-next-line no-undef
describe('UpdateInformationReviewController', () => {
  // eslint-disable-next-line no-undef
  describe('#Update information', () => {

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

    it('Update information ', (done) => {

      ///Get Campaing id
      Campaing.find({}).limit(1).then( (campainInfo) => {

        var campaingdata = {
          campaingid: campainInfo[0].numcamp
        };


        request(sails.hooks.http.app)
        .get('/review/update-information')
        .query(campaingdata)
        .expect(200, (err, res) => {
          if (err)
          {return done(err);}

          ////Nota en este punto deberia devolver un xml con el identificador
          ////asociado a las opiniones si es un mismo tel
          console.log(JSON.stringify(res.body.info));
          assert.equal(true, true);
          //console.log(res.body.files);
          done();
        });
      });
    });

    it('Update information not exist Campaing', (done) => {

      ///Get Campaing id
      Campaing.find({}).limit(1).then( (campainInfo) => {

        var campaingdata = {
          campaingid: '-1'
        };


        request(sails.hooks.http.app)
        .get('/review/update-information')
        .query(campaingdata)
        .expect(200, (err, res) => {
          if (err)
          {return done(err);}

          ////Nota en este punto deberia devolver un xml con el identificador
          ////asociado a las opiniones si es un mismo tel
          console.log(JSON.stringify(res.body.info));
          assert.equal('Not exist Public Campaing in WisePocket\'s plataform', res.body.info.messg);
          //console.log(res.body.files);
          done();
        });
      });
    });
  });
});
*/
