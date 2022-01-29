
const xml2js = require('xml2js');
const extractZip = require('extract-zip')
const path =  require('path');
const fs = require('fs');
const rmdir = require('rmdir');
const base64 = require('base-64')
const findRemoveSync = require('find-remove')

module.exports = {


  friendlyName: 'Process up loadfile',


  description: '',


  inputs: {
    uploadeds:{
      type:'json',
      description:"List of upload files",
      required: true
    },
    campaing:{
      type:'string',
      description:"Campaing identifier",
      required:true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },
    ErrorUndefinedFile:{
      description: 'Error undefined files',
    },
    UnCompressError:{
      description: 'Uncompress error',
    }
  },

//   Successfully generated:
//   •- api/helpers/process-up-loadfile.js
 
//  A few reminders:
//   (1)  To call this helper:
 
//            // With default usage:
//            await sails.helpers.processUpLoadfile(…, …);
 
//            // With named parameters:
//            await sails.helpers.processUpLoadfile.with({
//              someInput: …,
//              someOtherInput: …
//            });
 
//   (2)  You can read more about helpers in the Sails documentation.
//          [?] https://sailsjs.com/docs/concepts/helpers
  fn: async function (inputs, exits) {
    // TODO
    ////uncompress
    files = inputs.uploadeds
    idcampaing = inputs.campaing
    //console.log("----" + idcampaing)
    if ( typeof files === "undefined") {
      console.log("End Error ---> ")
      return exits.ErrorUndefinedFile ()
   }
   else {
     console.log("Process file--")
     var fileUnZipAddress =path.resolve(__dirname,"../../uploadzip/") ;
     var allResult = []

    
     for  (const iElement of files) {
      // files.forEach(function(iElement){
         var fileAddress = iElement;
         console.log("Extrac file " + iElement.fd )
         var base = path.resolve('.');
         console.log("Path " + base);
         console.log("Path " + fileUnZipAddress);
         var fileRandom =  path.basename(iElement.fd)

         extractZip(iElement.fd, {dir: fileUnZipAddress +"/" + fileRandom},  async function (err) {
            if (err){
              console.log("Hubo un error al descomprimir el archivo " + err.message)
              return exits.UnCompressError( err.message) 
             
            }
            else {
         
              result = await sails.helpers.processSimpleUploadfile.with(
                           {
                             campaingid:idcampaing,
                             fileUnZip:fileUnZipAddress,
                             fileName:fileRandom
                        })
                  //       .then(function (err, result){
                  // if (err) {
                  //   console.log("Hubo un error al descomprimir el archivo " + JSON.stringify(err))
                  //   return exits.UnCompressError( ) 
                  //   return;
                  // }
                  // else
                  if (typeof result !== 'undefined')
                     allResult.push(result)

                //Remove compact file
                fs.unlinkSync( iElement.fd, function (err, result) {
                  console.log("Delete file -- " + err);
                  console.log("Delete file -- " + result);
                })
                // fs.rmdir( iElement.fd , function (err, result){
                //   console.log("Delete file --- " + err);
                //   console.log("Delete file ---" + result);
                // })

                return exits.success("OK")
                // rmDir = function(dirPath) {
                //   try { var files = fs.readdirSync(dirPath); }
                //   catch(e) { return; }
                //   if (files.length > 0)
                //     for (var i = 0; i < files.length; i++) {
                //       var filePath = dirPath + '/' + files[i];
                //       if (fs.statSync(filePath).isFile())
                //         fs.unlinkSync(filePath);
                //       else
                //         rmDir(filePath);
                //     }
                //   fs.rmdirSync(dirPath);
                // };
                // rmDir( fileUnZipAddress +"/" + fileRandom);
                //Eliminar el contenido del archivo
                // fs.rmdir(fileUnZipAddress , function (err, result){
                //   console.log("Eliminado archivo " + result);
                //
                // })

             // })
            }
         })
       //})
      }
     
    
   }
  }


};

