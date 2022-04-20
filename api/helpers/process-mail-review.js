const Regex = require('regex');
const path = require('path');
const fs = require('fs');
const mailRegexExpression = /^(\w+)=>\$(.*)\$(.*)/;
const adressWValidator = /^\@(.*)\@\((.*)\)\&(.*)\&/;
const phoneNumberExample = /^\@(.*)\@\#(.*)\#\*(.*)\*\!(.*)\!\((.*)\)\&(.*)\&/;
const noPhoneNumberExample = /^\@(.*)\@\*(.*)\*\!(.*)\!\((.*)\)\&(.*)\&/;
const phoneNumberWMailExample = /^\@(.*)\@\#(.*)\#\*(.*)\*\((.*)\)\&(.*)\&/;
const phoneNumberWMailPhone = /^\((.*)\)\&(.*)\&/;
const smsRegexExpression = /^[\+|\d](\d+)=(.*)/;
const xml2js = require('xml2js');
const yaml = require('js-yaml');
const OPINION_TYPE = 'opinion';
module.exports = {
  friendlyName: 'Process mail review',

  description:
    'Help to process email user\'s opinions or requests in WisePocket\'s platform',

  inputs: {
    mailtext: {
      type: 'json',
      example:
        '$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&',
      description: 'The text opinion or request  from some user',
      required: true,
    },

    fromemail: {
      type: 'string',
      example: 'dionis@uo.edu.cu',
      description: 'The email source',
      required: true,
    },

    datemail: {
      type: 'string',
      description: 'End date for search opinion',
      example: '2020-03-10 06:34',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },

    noEmailFound: {
      description: 'Could not find any email text.',
    },
    error: {
      response: 'ERROR',
      message: 'ERROR',
    },
    noUsersFound: {
      response: 'ERROR',
      message: 'ERRORNot user found',
    },
    InsertMailError: {
      response: 'ERROR',
      message: 'Not insert email',
    },
    NotExistCampaing: {
      response: 'ERROR',
      message: 'Not exits campaing specified',
    },
    ErrorNotRegularExpresion: {},
  },

  fn: async function (inputs, exits) {
    // TODO

    ///If have all field
    var fieldArray = null;
    var opinionInfo = {};

    var sourceText = {
      mailtext: inputs.mailtext,
      datemail: inputs.datemail,
      fromemail: inputs.fromemail,
    };

    if (typeof sourceText.mailtext === 'undefined') {
      //console.log('Error')
      throw 'noUsersFound';
    } else {
      //########################################################################
      /**
         *
         *     TRANSFORM sourceText.mailtext to JSON with const yaml = require('js-yaml');
         *
         *         let data = yaml.safeLoad(fileContents, {
            schema: yaml.DEFAULT_FULL_SCHEMA,
          });
         *
         */
      //########################################################################

      try {
        // let yamlJSON = yaml.safeLoad(sourceText.mailtext.trim(), {
        //   schema: yaml.DEFAULT_FULL_SCHEMA,
        // });

        let yamlJSON = sourceText.mailtext;

        if (
          typeof yamlJSON === 'undefined' || typeof  yamlJSON.info === 'undefined'

        ) {


        } else {


        }

        var campaingid = yamlJSON.campaignid;
        let campaingObject = await Campaign.find({ id: campaingid }).limit(1);

        if (
          typeof campaingObject === 'undefined' ||
          campaingObject.length === 0
        ) {
          return exits.NotExistCampaing();
        } else {

          campaingid = campaingObject[0].id;
          //opinionInfo.name = yamlJSON.camaping_name;

          //console.log('-----------------------------------------------')


          // -
          // info:
          //  -
          //   'type': opinion
          //   'id': '45665'
          //   data:
          //     - contacto:
          //          name: Pedro Jose
          //          lastname: Moreno
          //          address: Calle 10 Rpto Sue�o, #264
          //          phone: '2334345444'
          //          mail: 'pedro@nauta.cu'
          //          nickname: 'ElSabelotodo'
          console.log('JSON in File ', yamlJSON);
          console.log('Data in File ', yamlJSON.info);
          let theOpinion = yamlJSON.info;

          if ( theOpinion.type !== OPINION_TYPE){

          }
          else {

            let dataInOpinion = theOpinion.contact;
            console.log(' Opionion Inner information ' , dataInOpinion)

            if ( typeof  dataInOpinion.phone !== 'undefined') {

              opinionInfo.phone = dataInOpinion.phone  || '';
              opinionInfo.address = dataInOpinion.address || '';

              opinionInfo.name = dataInOpinion.name || '';
              opinionInfo.lastname = dataInOpinion.lastname || '';
              opinionInfo.email = dataInOpinion.mail || '';

             // opinionInfo.email = sourceText.fromemail;


              opinionInfo.title = theOpinion.title;
              opinionInfo.data = theOpinion.text;

            } else {
              opinionInfo = null;
            }

            if (opinionInfo === null) {
              exits.error({
                response: 'Error',
                message: 'Opinion info is empty',
              });
            } else {
              //Set an example VVVVIIIIEWWWW
              ///Set date in system

              var ncitizen = {};
              var nsource = {};
              var nreview = {};

              nsource.type = 'email';
              nsource.imei = '';
              nsource.email = sourceText.fromemail;

              var currentDate = new Date();
              nreview.type = 'opinion';
              nreview.data = opinionInfo.data;
              nreview.title = opinionInfo.title;
              nreview.images = undefined;
              nreview.videos = undefined;
              nreview.gps = undefined;
              nreview.taperecord = undefined;
              nreview.date = currentDate;
              nreview.datelong = String(currentDate.getTime());

              nreview.campaing = campaingid;
              ncitizen.name = opinionInfo.name;
              ncitizen.lastname = opinionInfo.lastname;
              ncitizen.address = opinionInfo.address ;
              ncitizen.phonenumber = opinionInfo.phone;
              ncitizen.email = opinionInfo.email;

              ///Obtener los datos del contacto
              ///Obtener los datos de la fuente
              ///Verificar si existe la fuente
              ///sino insertarla
              ///insertar el contacto
              ///Insertar la opinion
              Source.findOne({ email: nsource.email }).exec(
                async (err, nsourceInfo) => {
                  if (err) {
                    exits.error({ response: 'Error', message: err.message });
                  } else {
                    if (!nsourceInfo) {
                      await Source.create(nsource);
                      //console.log('--- View -----')
                      let querynsourceInfoArray = await Source.find({
                        email: nsource.email,
                      }).limit(1);
                      nsourceInfo = querynsourceInfoArray[0];
                    }


                    let resultInsert =
                      await sails.helpers.insertDataInsystem.with({
                        source: nsource,
                        review: nreview,
                        citizen: ncitizen,
                        sourceInfo: nsourceInfo,
                      });

                    if (resultInsert === undefined) {
                      throw 'InsertMailError';
                    }
                    else {
                       console.log('********** CALL SERVICES FOR NLP OPINION CLASIFICATION *********');
                    }
                    return exits.success(resultInsert);
                  }
                }
              );
            }
          }


        }
      } catch (e) {
        console.log(e);
        exits.ErrorNotRegularExpresion({
          response: 'ERROR',
          message: 'Didn\'t any regular expression',
        });
      }

      // if (mailRegexExpression.test(sourceText.mailtext.trim())) {
      //   fieldArray = sourceText.mailtext.match(mailRegexExpression);
      //   //console.log('Mail data')
      //   //console.log(fieldArray)
      // } else if (adressWValidator.test(sourceText.mailtext)) {
      //   //Set an example VVVVIIIIEWWWW
      //   fieldArray = sourceText.mailtext.match(adressWValidator);
      //   opinionInfo.loginkey = fieldArray[1];
      //   opinionInfo.title = fieldArray[2];
      //   opinionInfo.data = fieldArray[3];
      //   await sails.helper.insertMailInformation(opinionInfo, sourceText);
      // } else {
      //   exits.ErrorNotRegularExpresion({
      //     response: 'ERROR',
      //     message: 'Didn\'t any regular expression',
      //   });
      // }
    }
  },
};
