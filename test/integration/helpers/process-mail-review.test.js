// test/integration/helpers/insert-data-insystem.test.js
var util = require('util');
var assert = require('assert');
var faker = require('faker');
const fs = require('fs');
const xml2js = require('xml2js');
const Regex = require('regex');
faker.locale = "es"

const pathToFile = 'test/fixtures/'
const royalSnsElizabeth = "+5352767508=$Elizabeth Astorga$@eastorga@#52767508#*ave de cespedes   *!!()&jdjdjdb&"
const royalSmsElizabeth = "+5352767508=@eastorga@()&a ver si funciona jajaja&"
const mailStringWithoutContact = "(El programa)@Eldato@&Esto que pasa es extrano&";
const mailStringWithoutContactAddress = "$Pepe Lopez$!!(Esto es una prueba)&Esto no es como parece&";
const mailStringWithContactAdd = "$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";

describe('process-mail-review (Helper)', function() {  

//   describe('#insertDataInSystem()', function() {
//     it('1 Should be insert a new Source and Citizen',  function (done) {
//       arraySources = ['internet', 'sms','email','whatshapp','telegram','messenger']
//       parameters = {
//         source:faker.random.arrayElement(arraySources),
//         review:faker.lorem.sentence(),
//         citizen:{
//           name:faker.name.firstName(),
//           address:faker.address.streetAddress(),
//           phone:faker.phone.phoneNumber()        
//         },
//         sourceInfo:faker.random.arrayElement(arraySources)       
//       }
//       // var value =  sails.helpers.insertDataInsystem      
//       // .with({
//       //   source:faker.random.arrayElement(arraySources),
//       //   review:faker.lorem.sentence(),
//       //   citizen:{
//       //     name:faker.name.firstName(),
//       //     address:faker.address.streetAddress(),
//       //     phone:faker.phone.phoneNumber()        
//       //   },
//       //   sourceInfo:faker.random.arrayElement(arraySources)        
//       // })
//       assert.equal(true, true);
//       return done();  
//     })   
//   });

  describe('#Extract MAIL Information()', function () {
    it('MAIL extract valid ',  function (done) {
      var sourceText = {
        mailtext: "",
        fromemail: "dionis@uo.edu.cu",
        datemail: new Date()
       };
      var mailStringWithContactAdde = "$Pepe Lopez$@Peo@#2344334433#*Calle 5ta y Ave Lutero #4533*!dionis@uo.edu.cu!(Esto es una prueba)&Esto no es como parece&";
      sourceText.mailtext = mailStringWithContactAdde;

      Campaing.find({}).limit(1).then( function (campainInfo){

        var campaingdata = {
          campaing: campainInfo[0].numcamp
        };

     
        ///// IMPORTANT ALWAYS ANY WISEPOCKET MESSAGES MUST HAVE AS A FIRT ELEMENT THE CAMPAING INDENTIFIER 
        ///// IN THESE TEST WILL BE  campaingdata.data + "=>"

        mailStringWithContactAdde = campaingdata.campaing + "=>" +mailStringWithContactAdde
        sourceText.mailtext = mailStringWithContactAdde
        sails.helpers.processMailReview( sourceText.mailtext,  sourceText.fromemail, sourceText.datemail)
                                          .then(function (result){
                                                    assert.notEqual(null, result);
                                                    var opinionInformation = result.opinion
                                                    assert.equal(undefined, opinionInformation.title);
                                                    assert.equal("Esto no es como parece", opinionInformation.data);
                                                    Review.findOne({id: result.opinion.id}).populate('citizen').then(function(findReview){
                                                          resultCitizen = findReview.citizen;
                                                          assert.equal("Pepe Lopez", resultCitizen.name);
                                                          assert.equal('', resultCitizen.lastname);
                                                          assert.equal("2344334433", resultCitizen.phonenumber);
                                                          assert.equal("Calle 5ta y Ave Lutero #4533", resultCitizen.address);
                                                          assert.equal("dionis@uo.edu.cu", resultCitizen.email);
                                                          return done();                                                       
                                                      }).catch(done);
                                                   
                                          }).catch(done) 
        
                                       }).catch(done)
   
   
    });


    it('Real MAIL extract valid ',  function (done) {
      var sourceText = {
        mailtext: "",
        fromemail: "dionis@uo.edu.cu",
        datemail: new Date()
       };

       //$Pepe Lopez$@Peo@#2344334433#*Calle 5ta y Ave Lutero #4533*!dionis@uo.edu.cu!(Esto es una prueba)&Esto no es como parece&
      var mailStringWithContactAdde = "$prueba$@prueba@##**!eastorga0604@gmail.com!(bdhdhd)&gsgshshshdh&";
      sourceText.mailtext = mailStringWithContactAdde;

      Campaing.find({}).limit(1).then( function (campainInfo){

        var campaingdata = {
          campaing: campainInfo[0].numcamp
        };

     
        ///// IMPORTANT ALWAYS ANY WISEPOCKET MESSAGES MUST HAVE AS A FIRT ELEMENT THE CAMPAING INDENTIFIER 
        ///// IN THESE TEST WILL BE  campaingdata.data + "=>"

        mailStringWithContactAdde = "0=>" +mailStringWithContactAdde
        sourceText.mailtext = mailStringWithContactAdde
        sails.helpers.processMailReview( sourceText.mailtext,  sourceText.fromemail, sourceText.datemail)
                                          .then(function (result){
                                                    assert.notEqual(null, result);
                                                    var opinionInformation = result.opinion
                                                    assert.equal(undefined, opinionInformation.title);
                                                    assert.equal("gsgshshshdh", opinionInformation.data);
                                                    Review.findOne({id: result.opinion.id}).populate('citizen').then(function(findReview){
                                                          resultCitizen = findReview.citizen;
                                                          assert.equal("prueba", resultCitizen.name);
                                                          assert.equal('', resultCitizen.lastname);
                                                          assert.equal("", resultCitizen.phonenumber);
                                                          assert.equal("", resultCitizen.address);
                                                          assert.equal("eastorga0604@gmail.com", resultCitizen.email);
                                                          return done();                                                       
                                                      }).catch(done);
                                                   
                                          }).catch(done) 
        
                                       }).catch(done)
   
   
    });


  //   it('MAIL invalid ', function (done) {
  //     var mailStringWithContactAdde = "(Esto es unannnnnnn????4433#*Calle 5ta y Ave Lutero #4533*&Esto no es como parece&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       assert.equal(null, result);
  //       done();
  //     })
  //   })
  //   // //
  //   // //
  //   // //
  //   it('Mail valid no contacto information', function (done) {

  //     //Gilbert's code 25-06-2017  "@" + nickname + "@" + "(" +asunto+ ")" + "&" + body + "&";
  //     var mailStringWithContactAdde = "@Eldato@(El programa)&Esto que pasa es extrano&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.notEqual(null, result);
  //       var opinionInformation = result
  //       assert.equal("Esto que pasa es extrano", opinionInformation.data);
  //       assert.equal("El programa", opinionInformation.title);
  //       Review.findOne({id: result.id}).populate('citizen').exec(function (err, resultCitizen) {
  //         if (err) {
  //           assert.equal(null, err, err);
  //           done();
  //         }
  //         else {
  //           opinionInformation = resultCitizen.citizen;
  //           assert.equal("Eldato", opinionInformation.loginkey);
  //           assert.equal('', opinionInformation.lastname);
  //           assert.equal('', opinionInformation.phonenumber);
  //           assert.equal('', opinionInformation.address);
  //           done();
  //         }

  //       })
  //     })


 
  //   //
  //   it('Mail valid only name information', function (done) {

  //     //Gilbert's code 25-06-2017  "$" + name +  "%" + "(" +asunto+ ")" +"&" + body + "&";
  //     var mailStringWithContactAdde = "$Pepe Lopez$(El programa)&Esto que pasa es extrano&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.notEqual(null, result);
  //       var opinionInformation = result

  //       Review.findOne({id: result.id}).populate('citizen').exec(function (err, resultCitizen) {
  //         if (err) {
  //           assert.equal(null, err, err);
  //           done();
  //         }
  //         else {
  //           assert.equal("El programa", opinionInformation.title);
  //           assert.equal("Esto que pasa es extrano", opinionInformation.data);
  //           opinionInformation = resultCitizen.citizen;
  //           assert.equal("Pepe Lopez", opinionInformation.name);
  //           assert.equal('', opinionInformation.lastname);
  //           assert.equal('', opinionInformation.phonenumber);
  //           assert.equal('', opinionInformation.address);

  //           done();
  //         }
  //       })
 

  //   // ////
  //   it('Mail valid no phone information', function (done) {
  //     var mailStringWithContactAdde = "$Pepe Lopez$@Peo@##*Calle 5ta y Ave Lutero #4533*!dionis@uo.edu.cu!(Esto es una prueba)&Esto no es como parece&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.notEqual(null, result);
  //       var opinionInformation = result

  //       assert.equal("Esto es una prueba", opinionInformation.title);
  //       assert.equal("Esto no es como parece", opinionInformation.data);
  //       Review.findOne({id: result.id}).populate('citizen').exec(function (err, resultCitizen) {
  //         if (err) {
  //           assert.equal(null, err, err);
  //           done();
  //         }
  //         else {
  //           opinionInformation = resultCitizen.citizen;
  //           assert.equal("Pepe Lopez", opinionInformation.name);
  //           assert.equal('', opinionInformation.lastname);
  //           assert.equal("", opinionInformation.phonenumber);
  //           assert.equal("dionis@uo.edu.cu", opinionInformation.email);
  //           assert.equal("Calle 5ta y Ave Lutero #4533", opinionInformation.address);

  //           done();
  //         }
  //       })

  //     })

  //   })
  //   it('Mail valid no mail information', function (done) {
  //     var mailStringWithContactAdde = "$Pepe Lopez$@Peo@#223123123#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.notEqual(null, result);
  //       var opinionInformation = result
  //       assert.equal("Esto es una prueba", opinionInformation.title);
  //       assert.equal("Esto no es como parece", opinionInformation.data);

  //       Review.findOne({id: result.id}).populate('citizen').exec(function (err, resultCitizen) {
  //         if (err) {
  //           assert.equal(null, err, err);
  //           done();
  //         }
  //         else {
  //           opinionInformation = resultCitizen.citizen;
  //           assert.equal("Pepe Lopez", opinionInformation.name);
  //           assert.equal('', opinionInformation.lastname);
  //           assert.equal("223123123", opinionInformation.phonenumber);
  //           assert.equal("", opinionInformation.email);
  //           assert.equal("Calle 5ta y Ave Lutero #4533", opinionInformation.address);

  //           done();

  //         }
  //       })


  //     })

  //   })
  //   // ////
  //   it('Mail valid no data information', function (done) {
  //     var mailStringWithContactAdde = "$Pepe Lopez$@Peo@#45435#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.equal(null, result);
  //       done();
  //     })

  //   })
  //   // ////
  //   it('Mail valid no data information', function (done) {
  //     var mailStringWithContactAdde = "$Pepe Lopez$@Peo@#45435#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.equal(null, result);
  //       done();
  //     })

  //   })
  //   // ///
  //   it('Mail valid all information', function (done) {
  //     var mailStringWithContactAdde = "$Pepe Lopez$@Peo@#223123123#*Calle 5ta y Ave Lutero #4533*!dionis@uo.edu.cu!(Esto es una prueba)&Esto no es como parece&";
  //     sourceText.mailtext = mailStringWithContactAdde;
  //     ProcessInputReviewService.processMailReview(sourceText, function (err, result) {
  //       //console.log("Resultado " + JSON.stringify(result))
  //       assert.notEqual(null, result);
  //       var opinionInformation = result
  //       assert.equal("Esto es una prueba", opinionInformation.title);
  //       assert.equal("Esto no es como parece", opinionInformation.data);
  //       Review.findOne({id: result.id}).populate('citizen').exec(function (err, resultCitizen) {
  //         if (err) {
  //           assert.equal(null, err, err);
  //           done();
  //         }
  //         else {
  //           opinionInformation = resultCitizen.citizen;
  //           assert.equal("Pepe Lopez", opinionInformation.name);
  //           assert.equal("Peo", opinionInformation.loginkey);
  //           assert.equal('', opinionInformation.lastname);
  //           assert.equal("223123123", opinionInformation.phonenumber);
  //           assert.equal("dionis@uo.edu.cu", opinionInformation.email);
  //           assert.equal("Calle 5ta y Ave Lutero #4533", opinionInformation.address);

  //           done();
  //         }
  //       })
  //     })

  //   })
  })
  
});