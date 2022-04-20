var request = require("supertest");

const assert = require("assert");
const fs = require("fs");
const util = require("util");
const xml2js = require("xml2js");
const Regex = require("regex");
var appRoot = require("app-root-path");
var path = require("path");
const pathToFile = "test\\fixtures";
const royalSnsElizabeth =
  "+5352767508=$Elizabeth Astorga$@eastorga@#52767508#*ave de cespedes   *!!()&jdjdjdb&";
const royalSmsElizabeth = "+5352767508=@eastorga@()&a ver si funciona jajaja&";
const mailStringWithoutContact =
  "(El programa)@Eldato@&Esto que pasa es extrano&";
const mailStringWithoutContactAddress =
  "$Pepe Lopez$!!(Esto es una prueba)&Esto no es como parece&";
const mailStringWithContactAdd =
  "$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";
describe("ProcessWebReview", function () {
  var sourceText = {
    mailtext: "",
    fromemail: "dionis@uo.edu.cu",
    datemail: new Date(),
  };

  describe("#Validate XML Information()", function () {
    it("XML valid", function (done) {
      var parser = new xml2js.Parser({ trim: true });

      // var path = pathToFile
      // console.log("Address " + path );
      // console.log("Current address execution.  >> " + appRoot + path.sep)
      fs.readFile(
        appRoot + path.sep + pathToFile + "\\WifiExampleMessage.xml",
        function (_err, data) {
          parser.parseString(data, function (err, result) {
            //console.log(util.inspect(result, false, null))
            //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

            //Datos de una informacion
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
            assert.equal(3, result.update.informations[0].info.length);
            //console.log('Done');
            done();
          });
        }
      );
    });

    it("XML valid", function (done) {
      var parser = new xml2js.Parser({ trim: true });
      //console.log("Direccion " + __dirname);
      fs.readFile(
        appRoot + path.sep + pathToFile + "/WifiExampleMessage.xml",
        function (err, data) {
          parser.parseString(data, function (err, result) {
            // console.log(util.inspect(result, false, null))
            //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

            //Datos de una informacion
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
            assert.equal(3, result.update.informations[0].info.length);
            //console.log('Done');
            done();
          });
        }
      );
    });

    it("XML invalid", function (done) {
      var parser = new xml2js.Parser({ trim: true });
      //console.log("Direccion " + __dirname);
      fs.readFile(
        appRoot + path.sep + pathToFile + +"/BadWifiExampleMessage.xml",
        function (err, data) {
          parser.parseString(data, function (err, result) {
            // console.log(util.inspect(result, false, null))
            //console.log("Tamano de information "+ JSON.stringify(result.update.informations))
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info.length))

            //Datos de una informacion
            //console.log("Tamano de informationes "+ JSON.stringify(result.update.informations[0].info[0]))
            assert.equal(true, typeof err !== "undefined");
            //console.log('Done');
            done();
          });
        }
      );
    });

    it("XML invalid call Services", function (done) {
      fs.readFile(
        appRoot + path.sep + pathToFile + "/BadWifiExampleMessage.xml",
        "utf-8",
        function (err, data) {
          sails.helpers
            .validateWifiReview(data)
            .then(function (result) {})
            .catch(function (err) {
              assert.equal("NotParsedData", err.code);
              done();
            });
        }
      );
    });

    it("XML invalid no contacto information", function (done) {
      fs.readFile(
        appRoot + path.sep + pathToFile + "/NoContactWifiExampleMessage.xml",
        "utf-8",
        function (_err, data) {
          sails.helpers
            .validateWifiReview(data)
            .then(function (result) {})
            .catch(function (err) {
              assert.equal("NotExistInfo", err.code);
              done();
            });
        }
      );
    });

    it("XML invalid no Text information", function (done) {
      fs.readFile(
        appRoot + path.sep + pathToFile + "/NoTextWifiExampleMessage.xml",
        "utf-8",
        function (err, data) {
          sails.helpers
            .validateWifiReview(data)
            .then(function (result) {})
            .catch(function (err) {
              assert.equal("NotExistInfo", err.code);
              done();
            });
        }
      );
    });

    it("XML invalid no Text information", function (done) {
      fs.readFile(
        appRoot + path.sep + pathToFile + "/NotInfoWifiExampleMessage.xml",
        "utf-8",
        function (err, data) {
          sails.helpers
            .validateWifiReview(data)
            .then(function (result) {})
            .catch(function (err) {
              assert.equal("NotExistInfo", err.code);
              done();
            });
        }
      );
    });
  });
});
