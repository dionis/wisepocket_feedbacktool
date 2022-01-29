var util = require('util');
var assert = require('assert');
var faker = require('faker');
const fs = require('fs');
const xml2js = require('xml2js');
const Regex = require('regex');
var appRoot = require('app-root-path');
var path = require('path');
var validator = require("email-validator");
faker.locale = "es"

const pathToFile = 'test/fixtures'
const royalSnsElizabeth = "+5352767508=$Elizabeth Astorga$@eastorga@#52767508#*ave de cespedes   *!!()&jdjdjdb&"
const royalSmsElizabeth = "+5352767508=@eastorga@()&a ver si funciona jajaja&"
const mailStringWithoutContact = "(El programa)@Eldato@&Esto que pasa es extrano&";
const mailStringWithoutContactAddress = "$Pepe Lopez$!!(Esto es una prueba)&Esto no es como parece&";
const mailStringWithContactAdd = "$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";

// describe('process-mailupdate-info (Helper)', function() {  

//   describe('#Read Updated Information in mail ()', function () {
//     it('Ok read information ',  function (done) {
     
//       ///Read YAML EXAMPLE FILE
//       bodyYAMLFile = "dddd"
//       ///Find email in source 
//        let fileContents = fs.readFileSync( appRoot + path.sep + pathToFile + path.sep + 'YAML_MAIL_TEXT', 'utf8');

//         Information.find({}).then( function (listInformation){
//             for (const info of listInformation){
//               console.log("------>" + JSON.stringify(info.source))
//                 if (validator.validate(info.source)){
//                     console.log("------>" + JSON.stringify(fileContents))
//                     sails.helpers.processMailupdateInfo.with({
//                         source:info.source,
//                         infoObject:info,
//                         bodymail:fileContents
//                     })
//                     .then(function (resultCallback){  
//                       assert.equal(true, true)                     
//                    })
                    
//                 }
//             }
//             done()
//         })     
//     });
//   }); 


  
// });