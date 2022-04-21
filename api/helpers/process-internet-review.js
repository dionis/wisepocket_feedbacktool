

const xml2js = require('xml2js');
const Regex = require('regex');
var appRoot = require('app-root-path');
var path = require('path');module.exports = {


  friendlyName: 'Process internet review',


  description: '',


  inputs: {
    campaingid:{
      type:'string',
      description:'Campaing identifier in database',
      example:'34453',
      required: true
    },
    text:{
      type:'string',
      description:'XML sended by WisePocket app',
      example:'Some xml example',
      required:true
    },
    fileXmlAddress:{
      type:'string',
      description:'Address when xml exist',
      example:'Some xml example',
      required:true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotContacInfo:{},
    NotExistInfo:{},
    NotInfoFormat:{},
    ErrorProcessInfo:{}
  },

  /*

      A few reminders:
      (1)  To call this helper:

                // With default usage:
                await sails.helpers.processInternetReview(…, …);

                // With named parameters:
                await sails.helpers.processInternetReview.with({
                  someInput: …,
                  someOtherInput: …
                });

      (2)  You can read more about helpers in the Sails documentation.
              [?] https://sailsjs.com/docs/concepts/helpers

  */

  fn: async function (inputs, exits) {
    // TODO
    var parser = new xml2js.Parser({trim: true});
    var reviewText = inputs.text
    var directoryAddress = inputs.fileXmlAddress
    var campaing = inputs.campaingid
    //console.log("TEXTO" + reviewText);
    //await Citizen.find({}).limit(1)
    parser.parseString(reviewText,  async (err, result) => {

      if (err){
        console.log(err)
        return NotInfoFormat(err);
      }
      else {
        if (typeof result.update === 'undefined' || typeof result.update.informations === 'undefined') {
          return NotExistInfo();
        }
        else {

          if (typeof result.update.informations[0].info === 'undefined') {
            return NotExistInfo();
          }
          else {
            if (typeof result.update.informations[0].info.length === 0) {
              return NotExistInfo();
            } else {
              ///Verify contac and text informations
              var notExecute = false

              console.log('!!!!!! Opinion\'s Campaign ids !!! ===> ',result.update.campaignid )
              console.log('!!!!!! Opinion\'s Sizes  !!! ===> ',result.update.informations.length)
              for (const iInfo of result.update.informations[0].info) {
                //.forEach(function (iInfo) {
                // console.log("-----------------------------------------------------------")
                // console.log(JSON.stringify(iInfo))
                // console.log("-----------------------------------------------------------")
                if (typeof iInfo.data[0].contacto === 'undefined' || typeof iInfo.data[0].text === 'undefined') {
                  // console.log("iInfo.data.contacto")
                  notExecute = true
                  return NotContacInfo();

                }
              }

              if (!notExecute) {
                ///Build answer XML and Insert in Data Base
                var sourceInfo = {};
                sourceInfo.type = 'internet';
                sourceInfo.imei = result.update.$.imei;

                sourceInfo.directoryAddress = directoryAddress;
                console.log('----> process-internet-review <-------- ' ) //+ JSON.stringify(result.update.informations[0].info)

                return exits.success( await sails.helpers.buildAnswerXml.with({
                  campaingid:campaing,
                  reviews:result.update.informations[0].info,
                  source:sourceInfo
                }))

              }

              else
                return exits.ErrorProcessInfo()
            }
          }
        }
      }
    })
  }


};

