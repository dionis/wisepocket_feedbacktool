
const xml2js = require('xml2js');
const Regex = require("regex");
var appRoot = require('app-root-path');
var path = require('path');
const fs = require('fs');
const gjv = require("geojson-validation");
//const pathToFile = 'geoinfo' + path.sep + '9455_wisepocket_map.geojson'
const pathToFile = 'attachments' + path.sep 
module.exports = {


  friendlyName: 'Read geographic information in geoinfo/ directory',


  description: 'Read  a Geojson file in ',


  inputs: {
    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    ErrorNotExistInfo:{
      description: 'Not exist file about geographical information.',
    },
    NotValidGeoJsonFile:{
      description: 'Not valid GeoJSON file.',
    }

  },
//   Successfully generated:
//   •- api/helpers/read-geographic-information.js
 
//  A few reminders:
//   (1)  To call this helper:
 
//            // With default usage:
//            await sails.helpers.readGeographicInformation(…, …);
 
//            // With named parameters:
//            await sails.helpers.readGeographicInformation.with({
//              someInput: …,
//              someOtherInput: …
//            });
 
//   (2)  You can read more about helpers in the Sails documentation.
//          [?] https://sailsjs.com/docs/concepts/helpers

  fn: async function (inputs, exits) {
    // TODO
    idcampaingid = inputs.campaingid
    try{
      //let fileContents = fs.readFileSync( appRoot + path.sep + pathToFile , 'utf8');
      //let fileContents = fs.readFileSync('./FORMATO_PERIODISTA_YAML.txt', 'utf8');
      //console.log("------------ Geografical information ----------------------")
      
     // objectInfo = JSON.parse(fileContents)

     //myjson =  JSON.parse(fileContents);
    
      //console.log(JSON.stringify( myjson.features))

     ///Llevar a JSON para enviar servicio
      //const directoryPath = path.join(__dirname, ".") 
      fs.readdir(appRoot + path.sep + pathToFile, function(err, files) {
        if (err) {
          console.log("Error getting directory information.")


        } else {
          //console.log("------ Directory Address ------")
          files.forEach( async function(file) {
            let fileContents = fs.readFileSync( appRoot + path.sep + pathToFile + path.sep + file , 'utf8');
            //let fileContents = fs.readFileSync('./FORMATO_PERIODISTA_YAML.txt', 'utf8');
            
            //console.log("------------ Geografical information ----------------------")
            try{ 
            objectInfo = JSON.parse(fileContents)
           
              // console.log(file)

              if ( !gjv.valid(objectInfo)) {
                fs.unlinkSync(appRoot + path.sep + pathToFile + path.sep + file);
                return exits.NotValidGeoJsonFile();
              }  

              ////Verify if feature/feature has or not these properties
              ///name, type, comentario, phones (Varios= arreglo), dirHttp (Varios= arreglo), dirCorreo (Varios= arreglo), image (Varios= arreglo).
              features = objectInfo.features

              for ( var iObject of features){

                propertiesObject = iObject.properties

                if (typeof propertiesObject.name === 'undefined' || propertiesObject.name === null )
                   propertiesObject.name = ""

                if (typeof propertiesObject.type === 'undefined' || propertiesObject.type === null )
                   propertiesObject.type = ""

                if (typeof propertiesObject.comentario === 'undefined' || propertiesObject.comentario === null )
                   propertiesObject.comentario = ""

                if (typeof propertiesObject.phones === 'undefined' || propertiesObject.phones === null )
                   propertiesObject.phones = ""

                if (typeof propertiesObject.dirHttp === 'undefined' || propertiesObject.dirHttp === null )
                   propertiesObject.dirHttp = ""
                
                if (typeof propertiesObject.dirCorreo === 'undefined' || propertiesObject.dirCorreo === null )
                   propertiesObject.dirCorreo = ""

                if (typeof propertiesObject.image === 'undefined' || propertiesObject.image === null )
                   propertiesObject.image = []

              }

            }
            catch(e){
              fs.unlinkSync(appRoot + path.sep + pathToFile + path.sep + file);
              return exits.NotValidGeoJsonFile();
            }

            geoData = await GeoInformation.find()
            //console.log("Geodata " + JSON.stringify(geoData))
           // if ( typeof geoData === 'undefined' || geoData.length === 0) {
              await GeoInformation.destroy({})
           // }
            // else 
            //   await GeoInformation.update({campaing:idcampaingid}).set({info:objectInfo}) 
      
             await GeoInformation.create({ info:objectInfo})

             fs.unlinkSync(appRoot + path.sep + pathToFile + path.sep + file);

             return exits.success()
          })
        }
      }) 

    }
    catch( e){
      console.log(JSON.stringify(e))
      return exists.ErrorNotExistInfo(JSON.stringify(e))

    }
    

  }


};

