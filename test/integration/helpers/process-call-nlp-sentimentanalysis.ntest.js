/* eslint-disable no-undef */
// test/integration/helpers/insert-data-insystem.test.js
var util = require('util');
var assert = require('assert');
var faker = require('faker');
const fs = require('fs');
const xml2js = require('xml2js');
const yaml = require('js-yaml');
const Regex = require('regex');
faker.locale = 'es';

const pathToFile = 'test/fixtures/';
const appRoot = require('app-root-path');
const path = require('path');

describe('process-call-nlp-sentimentanalysis (Helper)', () => {

  describe('#Call NLP Sentiment Analysis Web Services Information()', () => {
    it('Call NLP Services ', (done) => {
      var sourceText = {

      };

      fs.readFile(
        appRoot + path.sep + pathToFile + '\\opinionmail.yaml',
        'utf8',
        (_err, data) => {
          let yamlJSON = yaml.safeLoad(data, {
            schema: yaml.DEFAULT_FULL_SCHEMA,
          });


          Campaign.find({})
            .limit(1)
            .then((campainInfo) => {
              var campaingdata = {
                campaing: campainInfo[0].id,
              };

              ///
              ///IMPORTANT TO PASS THE TEST
              ///is necessary to PUT some exist campaing ID
              ///
              yamlJSON.campaignid = campainInfo[0].id;
              sourceText.mailtext = yamlJSON;


              // IMPORTANT ALWAYS ANY WISEPOCKET MESSAGES MUST HAVE AS A FIRT ELEMENT THE CAMPAING INDENTIFIER
              // IN THESE TEST WILL BE  campaingdata.data + "=>"

              //console.log('Output  YAML TO JSON ===> ', yamlJSON);

              sourceText.textreview  = 'Apple is looking at buying U.K. startup for $1 billion. But New York find people';
              sourceText.aspect = 'people';
              sourceText.opinionid =  ''+new Date().getTime();
              sourceText.camapaignid = yamlJSON.campaignid;

              sails.helpers
                .nlpSentimentAnalysisCall(
                  sourceText.textreview,
                  sourceText.aspect,
                  sourceText.opinionid,
                  sourceText.camapaignid
                ).tolerate('callServiceError', ()=>{
                  console.log('<==== Error ====> ' );
                  //return done();

                })
                .then( (result)=>{
                  console.log('<==== Result ====> Service Output' );
                  console.log(result);
                  return done();});
              // .then((result) => {

              //   console.log('!!!!! Successful ===> +++ ',result );

              //   assert.notEqual(null, result);


              //   var opinionInformation = result.opinion;
              //   // assert.equal(undefined, opinionInformation.title);
              //   // assert.equal(
              //   //   'Como conocer el medicamento contra el Dengu\n peuwba y accion y prueba y acciones y sigo\n',
              //   //   opinionInformation.data
              //   // );
              //   // Review.findOne({ id: result.opinion.id })
              //   //   .populate('citizen')
              //   //   .then((findReview) => {
              //   //     resultCitizen = findReview.citizen;
              //   //     console.log("Contact Info ==> ", resultCitizen)
              //   //     assert.equal('Pedro Jose', resultCitizen.name);
              //   //     assert.equal('', resultCitizen.lastname);
              //   //     assert.equal('2334345444', resultCitizen.phonenumber);
              //   //     assert.equal(
              //   //       'Calle 10 Rpto Sue�o, #264',
              //   //       resultCitizen.address
              //   //     );
              //   //     assert.equal('pedro@nauta.cu', resultCitizen.email);
              //   return done();
              // })
              //     .catch(done);
            })
                .catch(done);
        });
    });
  });

});

