/* eslint-disable no-undef */
// test/integration/helpers/insert-data-insystem.test.js
var util = require('util');
var assert = require('assert');
var faker = require('faker');
faker.locale = "es"
/*
describe('Insert-data-insystem (Helper)', function() {
  var sourceText = {
    mailtext: "",
    fromemail: "dionis@uo.edu.cu",
    datemail: new Date()
};
  // describe('#insertDataInSystem()', function() {
  //   it('1 Should be insert a new Source and Citizen',   function (done) {
  //     arraySources = ['internet', 'sms','email','whatshapp','telegram','messenger']

  //     var ncitizen = {};
  //     var nsource = {};


  //     Campaing.find({}).limit(1).then( function (campainInfo){

  //           var nreview = {
  //             campaing: campainInfo[0].id
  //         };

  //         nsource.type = "email";
  //         nsource.imei = "";
  //         nsource.email = sourceText.fromemail;

  //         var currentDate = new Date();
  //         nreview.type = "opinion"
  //         nreview.data = faker.lorem.sentence();
  //         nreview.title = faker.lorem.sentence();
  //         nreview.images = undefined;
  //         nreview.videos = undefined;
  //         nreview.gps = undefined;
  //         nreview.taperecord = undefined;
  //         nreview.date = currentDate;

  //         nreview.datelong =  String(currentDate.getTime());

  //         //Very important to know the campaing's indentifier

  //         ncitizen.name = faker.name.firstName();
  //         ncitizen.systempassword = faker.lorem.words();
  //         ncitizen.movilphonenumber = faker.phone.phoneNumber();
  //         ncitizen.lastname = faker.name.lastName();
  //         ncitizen.address = faker.address.streetAddress();
  //         ncitizen.phonenumber = faker.phone.phoneNumber();
  //         ncitizen.email = faker.internet.email();
  //         ncitizen.loginkey = faker.name.title();

  //         Source.find().limit(1)
  //         .then( function(nsourceInfo) {
  //          sails.helpers.insertDataInsystem
  //           .with({
  //             source:nsource,
  //             review:nreview,
  //             citizen:ncitizen,
  //             sourceInfo:nsourceInfo
  //           }).then(function (value){

  //             ///Find if exist a new inserted citizen
  //             Citizen.find({
  //               name:ncitizen.name,
  //               lastname:ncitizen.lastname,
  //               phonenumber:ncitizen.phonenumber,
  //               email:ncitizen.email,
  //             }).then(function(nCitizen){

  //               console.log("----- Verify inserted Citizen ------")
  //               assert.notEqual(undefined, nCitizen);
  //               assert.notEqual(undefined, value);
  //               return done();

  //             }).catch(done);

  //           }).catch(done);

  //           // newCitizen = await Citizen.create(ncitizen);

  //           // console.log("Nuevo Ciudadano 1 ==> " + JSON.stringify(ncitizen))
  //           // citizendInfoEx = await Citizen.find(
  //           //    {
  //           //      name:ncitizen.name,
  //           //      systempassword:ncitizen.systempassword,
  //           //      movilphonenumber:ncitizen.movilphonenumber,
  //           //      lastname:ncitizen.lastname,
  //           //      address:ncitizen.address,
  //           //      phonenumber:ncitizen.phonenumber,
  //           //      email:ncitizen.email,
  //           //      loginkey:ncitizen.loginkey
  //           //    }

  //           // ).limit(1)

  //           // console.log("Nuevo Ciudadano 2 ==> " + JSON.stringify(citizendInfoEx))

  //           // var generateNameCampaing = faker.commerce.productName()
  //           // newCampaing = await Campaing.find().limit(1)

  //           // sourceReview = {
  //           //       type:"opinion" ,
  //           //       status:"view",
  //           //       subject:faker.lorem.sentence(),
  //           //       data: faker.lorem.paragraph(),
  //           //       date:faker.date.recent(),
  //           //       citizen:useInDataBase.id,
  //           //       campaing:newCampaing.id,
  //           //       datelong:faker.date.past()
  //           //   }
  //           //     sourceReview.citizen = citizendInfoEx;
  //           //     result = await sails.helpers.insertReview.with({
  //           //                                                       review:sourceReview,
  //           //                                                       source:nsourceInfo
  //           //                                                    })
  //           //     ///Update citizen relation with source
  //           //     console.log("Crear " + JSON.stringify(citizendInfoEx))
  //           //     result = await sails.helpers.updateCitizenSource.with({
  //           //                                                   sourceCitizen:citizendInfoEx,
  //           //                                                   sourceInSystem:nsourceInfo
  //           //                                                 })

  //       })
  //      .catch(done);
  //     }).catch(done);


  //   });
  // });
});
*/
