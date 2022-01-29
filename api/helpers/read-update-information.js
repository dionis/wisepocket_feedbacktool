const xml2js = require('xml2js');
const Regex = require("regex");
var appRoot = require('app-root-path');
var path = require('path');
const fs = require('fs');

module.exports = {


  friendlyName: 'Read update information',


  description: 'It reads information about topic and source need to be updated in etc/updateSourceInformation.xml',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotParsedData:{
      description:"Not parsed data.",
    },
    NotExistInfo:{
      description:"Not exist information (info) in data.",
    }

  },


  fn: async function (inputs, exits) {
    // TODO
    var parser = new xml2js.Parser({trim: true});

    
    ///Address when exist update information
    const pathToFile = 'etc' + path.sep + 'updateSourceInformation.xml'


    ////Validate if exist address and return exist error if not
    
    // console.log("Adress " +  appRoot + path.sep + pathToFile)
    fs.readFile( appRoot + path.sep + pathToFile ,  function(err, data) {
        parser.parseString(data, async function (err, result) {
          //console.log(JSON.stringify(result))
        if (err){
          // console.log("error " + JSON.stringify(err))
          return exits.NotParsedData()
        }
        else {
          if ( typeof result.informations === "undefined" || typeof result.informations.info === "undefined" || typeof result.informations.info.length === 0) {
              return exits.NotExistInfo()
          }

          for  (const iInfo of result.informations.info) {
            // console.log("-----------------------------------------------------------")
            // console.log(JSON.stringify(iInfo))
            // console.log("-----------------------------------------------------------")
            if (typeof iInfo.title === undefined || typeof iInfo.source === undefined) {
              //console.log("Information to search " + iInfo)
              notExecute = true          
              return exits.NotExistInfo();

            }

            dateInformation = await Information.find({title:iInfo.title[0]})
            if (typeof dateInformation === undefined || dateInformation.length == 0){
                  await Information.create({
                      title:iInfo.title[0],
                      source:iInfo.source[0],
                      type:iInfo.type[0],
                      uuid:iInfo.uuid[0],
                      classifier:iInfo.classifier[0]
                      })                                   
            }
            else {
              //  console.log("<<-----Update information---->>>")
                 await  Information.update({title:iInfo.title[0]}).set({
                      title:iInfo.title[0],
                      source:iInfo.source[0],
                      type:iInfo.type[0],
                      uuid:iInfo.uuid[0],
                      classifier:iInfo.classifier[0]
                      })                      
            }                       
         
           }
          //result.informations.info.forEach( async function (iInfo) { 
          ///Set TimeUpdate timestamp

          //console.log("<<------ Update WisePocket Platform  date information update ----->>")
          timestamp = Date.now().toString();
                 
          times = await TimeUpdate.find()
          if (typeof times === 'undefined' || times.length == 0 ){
           await TimeUpdate.create({time:timestamp})
          }
          
          return exits.success()
        }
      })
    })   
  }  
 


};

