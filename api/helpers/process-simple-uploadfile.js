/* eslint-disable handle-callback-err */
const xml2js = require('xml2js');
const extractZip = require('extract-zip');
const path = require('path');
const fs = require('fs');
const rmdir = require('rmdir');
const base64 = require('base-64');
const findRemoveSync = require('find-remove');
module.exports = {
  friendlyName: 'Process simple uploadfile',

  description: '',

  inputs: {
    fileUnZip: {
      type: 'string',
      description: 'Address when files will be process',
      example: '/ect/var/uploadfile',
      required: true,
    },
    fileName: {
      type: 'string',
      description: 'Unzip filename',
      example: '34nf2334.zip',
      required: true,
    },
    campaingid: {
      type: 'string',
      description: 'Campaing identifier in database',
      example: '34453',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    // TODO
    fileUnZipAddress = inputs.fileUnZip;
    fileRandom = inputs.fileName;
    campaing = inputs.campaingid;
    var pathToFiles = fileUnZipAddress + path.sep + fileRandom;
    ///For each file read and upload to database
    ///and fin xml with information
    fs.readdir(pathToFiles, async (err, items) => {
      console.log(JSON.stringify(items));
      console.log('File in directory');
      for (var i = 0; i < items.length; i++) {
        //console.log(" 3 ===> Archivos dentro del compactado " + items[i]);

        ///If no es un xml convirtir a string y almacenar en Base de Datos en la tabla imagenes
        if (path.extname(pathToFiles + path.sep + items[i]) !== '.xml') {
          ///Verify its jpg, png or othe image format
          if (
            path.extname(pathToFiles + path.sep + items[i]) ||
            '.jpeg' ||
            '.jpg' ||
            '.png'
          ) {
            ///Covert to String base 64 and isert in Data Base
            ///INSERT IMAGE AS BASE 64 IN System
          }
        } else {
          ////Insert information and delete xml file
          console.log('!!! Delete information the file system !!!');

          ///Read file and insert Information
          let data = fs.readFileSync(pathToFiles + path.sep + items[i], 'utf-8');

          let result = await sails.helpers.processInternetReview.with({
            campaingid: campaing,
            text: data,
            fileXmlAddress: pathToFiles,
          });

          console.log(
            '-----------<<<< DELETE FILES UNZIPED >>>>> ----------------- '
          );

          // rmdir(pathToFiles, function (err, dirs, files) {
          //   // console.log(dirs);
          //   // console.log(files);
          //   // console.log('all files are removed');
          //   fs.rmdir( pathToFiles , function (err, result){
          //     // if (err && typeof result !== 'undefined')
          //     //   console.log(" --- " + JSON.stringify(err))
          //     // if (typeof result !== 'undefined')
          //     //   console.log("Eliminado archivo " + result);
          //   })
          // });

          //  var result = findRemoveSync(pathToFiles, {dir: "*", files: "*.*"})

          //console.log(JSON.stringify(result));
          //console.log('----------- Unzip delete files ----------------- ');

          if (result.length > 1) {
            console.log('Delete all files sucessfully');
          }
          return exits.success(result);
          //})
          //  });
        }
      }
    });
  },
};
