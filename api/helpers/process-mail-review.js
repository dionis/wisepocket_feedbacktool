
const Regex = require("regex");
const path =  require('path');
const fs = require('fs');
const mailRegexExpression = /^(\w+)=>\$(.*)\$(.*)/;
const adressWValidator = /^\@(.*)\@\((.*)\)\&(.*)\&/;
const phoneNumberExample = /^\@(.*)\@\#(.*)\#\*(.*)\*\!(.*)\!\((.*)\)\&(.*)\&/;
const noPhoneNumberExample = /^\@(.*)\@\*(.*)\*\!(.*)\!\((.*)\)\&(.*)\&/;
const phoneNumberWMailExample = /^\@(.*)\@\#(.*)\#\*(.*)\*\((.*)\)\&(.*)\&/;
const phoneNumberWMailPhone = /^\((.*)\)\&(.*)\&/;
const smsRegexExpression  = /^[\+|\d](\d+)=(.*)/;
const xml2js = require('xml2js');

module.exports = {


  friendlyName: 'Process mail review',


  description: 'Help to process email user\'s opinions or requests in WisePocket\'s platform',


  inputs: {
    mailtext: {
      type: 'string',
      example: '$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&',
      description: 'The text opinion or request  from some user',
      required: true
    },

    fromemail: {
      type: 'string',
      example:'dionis@uo.edu.cu',
      description: 'The email source',
      required: true
    },
 
    datemail: {
      type:'string',
      description:"End date for search opinion",
      example:'2020-03-10 06:34',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    
    noEmailFound: {
      description: 'Could not find any email text.'
    },
    error:{
      response: "ERROR",
      message: "ERROR"
    },
    noUsersFound:{
      response: "ERROR",
      message: "Not user found"

    },
    InsertMailError:{
      response: "ERROR",
      message: "Not insert email"
    },
    NotExistCampaing:{
      response: "ERROR",
      message: "Not exits campaing specified"
    },
    ErrorNotRegularExpresion:{
      
    }

  },


  fn: async function (inputs, exits) {
    // TODO

     ///If have all field
     var fieldArray = null
     var opinionInfo = {}

     var sourceText =  {
                          mailtext: inputs.mailtext ,
                          datemail: inputs.datemail ,
                          fromemail: inputs.fromemail
                       }
     console.log("Evaluacion " + JSON.stringify(sourceText))

     if (typeof sourceText.mailtext === "undefined") {
       //console.log("Error")
       throw 'noUsersFound';
     }
     else {
 
       //console.log("Validate chain")
       if (mailRegexExpression.test(sourceText.mailtext.trim())) {
         fieldArray = sourceText.mailtext.match(mailRegexExpression)
         //console.log("Mail data")
         //console.log(fieldArray)
         var campaingid = fieldArray[1]

         campaingObject = await Campaing.find({numcamp:campaingid}).limit(1)

         if (typeof campaingObject === "undefined" || campaingObject.length == 0)
           return  exits.NotExistCampaing()

         campaingid = campaingObject[0].id

         opinionInfo.name = fieldArray[2];

         //console.log("-----------------------------------------------")
 
         var otherField = fieldArray[3]
         if (phoneNumberExample.test(otherField)) {
           fieldArray = otherField.match(phoneNumberExample)
           opinionInfo.loginkey = fieldArray[1];
           opinionInfo.phone = fieldArray[2];
           opinionInfo.address = fieldArray[3];
           opinionInfo.email = fieldArray[4];
           opinionInfo.title = fieldArray[5];
           opinionInfo.data = fieldArray[6];
         }
         else if (noPhoneNumberExample.test(otherField)) {
           fieldArray = otherField.match(noPhoneNumberExample);
           opinionInfo.loginkey = fieldArray[1];
           opinionInfo.address = fieldArray[2];
           opinionInfo.email = fieldArray[3];
           opinionInfo.title = fieldArray[4];
           opinionInfo.data = fieldArray[5];
         }
         else if (phoneNumberWMailExample.test(otherField)) {
           fieldArray = otherField.match(phoneNumberWMailExample);
           opinionInfo.loginkey = fieldArray[1];
           opinionInfo.phone = fieldArray[2];
           opinionInfo.address = fieldArray[3];
           opinionInfo.title = fieldArray[4];
           opinionInfo.data = fieldArray[5];
 
         }
         else if (phoneNumberWMailPhone.test(otherField)) {
           fieldArray = otherField.match(phoneNumberWMailPhone);
           opinionInfo.title = fieldArray[1];
           opinionInfo.data = fieldArray[2];
         }
         else {
           opinionInfo = null;
         }
 
         if (opinionInfo === null) {
          exits.error({response: "Error", message: "Opinion info is empty"})
        }
        else { //Set an example VVVVIIIIEWWWW
    
          ///Set date in system
    
          var ncitizen = {};
          var nsource = {};
          var nreview = {};
    
          nsource.type = "email";
          nsource.imei = "";
          nsource.email = sourceText.fromemail;
    
          var currentDate = new Date();
          nreview.type = "opinion"
          nreview.data = opinionInfo.data;
          nreview.title = opinionInfo.title;
          nreview.images = undefined;
          nreview.videos = undefined;
          nreview.gps = undefined;
          nreview.taperecord = undefined;
          nreview.date = currentDate;
          nreview.datelong =  String(currentDate.getTime());

          nreview.campaing = campaingid
          ncitizen.name = opinionInfo.name;
          ncitizen.lastname = opinionInfo.lastname;
          ncitizen.address = opinionInfo.address;
          ncitizen.phonenumber = opinionInfo.phone;
          ncitizen.email = opinionInfo.email;
             
          ///Obtener los datos del contacto
          ///Obtener los datos de la fuente
          ///Verificar si existe la fuente
          ///sino insertarla
          ///insertar el contacto
          ///Insertar la opinion
          Source.findOne({email: nsource.email}).exec(async function (err, nsourceInfo) {
            if (err) {
              exits.error({response: "Error", message: err.message})
            }
            else {
              if (!nsourceInfo) {
                await Source.create(nsource);
                //console.log("--- View -----")
                nsourceInfoArray = await Source.find({
                                      email:nsource.email
                                      }).limit(1)
                nsourceInfo =   nsourceInfoArray[0]                 
              }

              // console.log("<<<< Insert data >>>>")
              // console.log("-- Source " + JSON.stringify(nsource))
              // console.log("-- Review " + JSON.stringify(nreview))
              // console.log("-- Citizen " + JSON.stringify(ncitizen))
              // console.log("-- Source Info " + JSON.stringify(nsourceInfo))

              resultInsert =  await sails.helpers.insertDataInsystem.with({
                  source:nsource,
                  review:nreview,
                  citizen:ncitizen,
                  sourceInfo:nsourceInfo        
                })    
                
                if (resultInsert === undefined) 
                 throw 'InsertMailError'
                //console.log(" <----- Valores " + JSON.stringify(resultInsert))
                return exits.success(resultInsert) 
            }
          })
        }
 
       }
       else if (adressWValidator.test(sourceText.mailtext)) { //Set an example VVVVIIIIEWWWW
         fieldArray = sourceText.mailtext.match(adressWValidator)
         opinionInfo.loginkey = fieldArray[1];
         opinionInfo.title = fieldArray[2];
         opinionInfo.data = fieldArray[3];
         resultInserMail = sails.helper.insertMailInformation(opinionInfo, sourceText);
       }
       else
         exits.ErrorNotRegularExpresion({response: "ERROR", message: "Didn't any regular expression"})
     }
  }


};

