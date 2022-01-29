var util = require('util');
var assert = require('assert');
var faker = require('faker');
const fs = require('fs');
const xml2js = require('xml2js');
const Regex = require('regex');
var appRoot = require('app-root-path');
var path = require('path');
faker.locale = "es"

const pathToFile = 'test/fixtures/'
const royalSnsElizabeth = "+5352767508=$Elizabeth Astorga$@eastorga@#52767508#*ave de cespedes   *!!()&jdjdjdb&"
const royalSmsElizabeth = "+5352767508=@eastorga@()&a ver si funciona jajaja&"
const mailStringWithoutContact = "(El programa)@Eldato@&Esto que pasa es extrano&";
const mailStringWithoutContactAddress = "$Pepe Lopez$!!(Esto es una prueba)&Esto no es como parece&";
const mailStringWithContactAdd = "$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";

describe('read-geographic-information (Helper)', function() {  

  describe('#Rea Information()', function () {
    it('Ok read information ',  function (done) {
     

      Campaing.find({}).limit(1).then( async function (campainInfo){

        var campaingdata = {
          campaingid: campainInfo[0].numcamp
        };
        var parser = new xml2js.Parser({trim: true});
        sails.helpers.readGeographicInformation.with(campaingdata)
                                          .then(function (resultCallback){                                                                                       
                                                    Information.find().then(function(listInformation){
                                                        const pathToFile = 'etc' + path.sep + 'updateSourceInformation.xml'
                                                        fs.readFile( appRoot + path.sep + pathToFile , function(err, data) {
                                                            parser.parseString(data, function (err, result) {                                                               
                                                                assert.equal(result.informations.info.length, listInformation.length)
                                                                return done();                                                           
                                                            })
                                                        })            
                                                                                                                
                                                      }).catch(done);
                                                   
                                          }).catch(done) 
        
                                       }).catch(done)  
   
    });
  }); 
});