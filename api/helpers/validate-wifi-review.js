const xml2js = require('xml2js');
const Regex = require("regex");
module.exports = {


  friendlyName: 'Validate wifi review',


  description: '',


  inputs: {
    data: {
      type: 'string',
      example: "<update system=\"WisePocket\" date=\"2017/05/23\" imei=\"353567051450238\" campaingid=\"1234\"><informations><info type=\"opinion\" id=\"45665\"></info></informations></update>",
      description: 'the review xml send since mobile device',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotParsedData:{
      description:"Not parsed data.",
    },
    NotContactData:{
      description:"Not exist contact information (info) in data.",
    },
    NotExistInfo:{
      description:"Not exist information (info) in data.",
    }
  },

//   Successfully generated:
//   •- api/helpers/validate-wifi-review.js
 
//  A few reminders:
//   (1)  To call this helper:
 
//            // With default usage:
//            await sails.helpers.validateWifiReview(…, …);
 
//            // With named parameters:
//            await sails.helpers.validateWifiReview.with({
//              someInput: …,
//              someOtherInput: …
//            });
 
//   (2)  You can read more about helpers in the Sails documentation.
//          [?] https://sailsjs.com/docs/concepts/helpers
  fn: async function (inputs,exits) {
    // TODO
    var parser = new xml2js.Parser({trim: true});
    reviewText = inputs.data;
    parser.parseString(reviewText, function (err, result) {
      if (err)
        return exits.NotParsedData()
      else {
        if (typeof result.update === "undefined" || typeof result.update.informations === "undefined") {
            return exits.NotExistInfo()
        }
        else {

          if (typeof result.update.informations.info === "undefined") {
              return exits.NotExistInfo()
          }
          else {
            if (typeof result.update.informations.info.length === 0) {
              return exits.NotExistInfo()
            } else {
              ///Verify contac and text informations
              result.update.informations.info.forEach(function (iInfo) {
                if (typeof iInfo.data.contacto === "undefined" || typeof iInfo.data.text === "undefined") {
                  return exits.NotContactData()
                }
              });
              return exits.success("Ok")
            }
          }
        }
      }
  })
}


};

