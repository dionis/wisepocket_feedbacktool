const fs = require('fs');

module.exports = {

 
  friendlyName: 'Insert images',


  description: 'Insert images associated to a review',


  inputs: {
    review:{
      type: 'ref',
      description: 'Review insert definition object',
      required: true
    },
    source:{
      type: 'ref',
      description: 'Source insert definition object',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },
    error:{

    },
    noImageFound:{
      err:"Not exist information for inserting images"
    }
  },


  fn: async function (inputs, exits) {
    // TODO
    //   A few reminders:
    //  (1)  To call this helper:

    //           // With default usage:
    //           await sails.helpers.insertImages(…, …);

    //           // With named parameters:
    //           await sails.helpers.insertImages.with({
    //             someInput: …,
    //             someOtherInput: …
    //           });

    //  (2)  You can read more about helpers in the Sails documentation.
    //         [?] https://sailsjs.com/docs/concepts/helpers

    review = inputs.review;
    source = inputs.source;
    if ( review.images === null || typeof  review.images === "undefined"  || typeof  review === "undefined" ){
        throw 'noImageFound';
     
    }
    else {
      if (review.images.length == 0) {
        throw exits.error("Image length equal 0")
      }
      else {
        if (review.images.length > 0 && source.type === "wifi") {

          var imeiIdentifier = source.imei;

          ////Para cada una de las imagenes que existen
          ///en source adress  Insertarlas obteniendo su base 64  en
          //el systema y concatenandole  el result Update
          // console.log("Review Inserted " + JSON.stringify(review) )
          async.concat(review.images, function (iInfo, callbackv) {

            iInfo.image.forEach(function (iElement){
              // console.log("Imagen para intentar almacenar " + iElement )
               if (typeof iElement !== "undefined" && iElement !== "") {
                 var fileName = iElement; 
                 // if (path.extname(fileName) !== ".jpeg"  && path.extname(fileName) !== ".jpg" && path.extname(fileName) !== ".png") {
                 //   fileName += ".jpg";
                 // }
 
                 var fileAdress = source.directoryAddress + path.sep + fileName;
                // console.log("Imagen a buscar " + fileAdress)
                 if (fs.existsSync(fileAdress)) {
                  //console.log("--------  Insertado la imagen   --------")
                  // console.log(fileAdress);
  
                  result = sails.helpers.base64Encode(fileAdress)                
                  if (!result) { 
                    // console.log("------- Imagen en base 64 -----" )
                    // console.log(result)
                    // console.log("---------------------------------------------") 
                    var imagedata = {
                      title: iElement,
                      image: result,
                      review: review
                    }
                    // console.log("<<< Creacion de la imagen >>>")
                      Images.create(imagedata).exec(async function (err, resultImage) {
                      console.log("<<< Creacion de la imagen >>> " + JSON.stringify(err))
                      if (!err) {
                      //  console.log("!!!!! Imagen creada con exito !!!!! ")
                        //console.log(JSON.stringify(resultImage.title));
                        // console.log("----------------------------------------")
                        //callback(null ,resultOpinion);
                      }
                    })                  
                   }
                  }
                 }
               })
               
        
 //             {"$":{"type":"felicitation","id":"45667"},"citizenid":["RTE33454544"],"programtitle":["El problema del agua en Santiago"],"data":[{"
 //             contacto":[{"name":["Pedro Jose"],"lastname":["Moreno"],"adress":["Calle 10 Rpto Sueño, #264"],"phone":["2334345444"],"mail":["pedro
 // @nauta.cu"],"nickname":["El Bello"],"gps":[{"latitude":["23.3232"],"longitude":["54.333"]}]}],"title":["Viva el 1ro de Mayo"],"text"
 //             :["Orgulloso de Santiago y sus activades"]}],"images":[{"image":["/199393.JPG"]}],"videos":["/fgdd.mp4"],"records":["/gardd.mp3"]}
  
             callbackv(null, iInfo)


          }, function (err, placeFormationAsociation) {
            // files is now a list of filenames that exist in the 3 directories
            //console.log(JSON.stringify(placeFormationAsociation));
            if (err) {
              console.log("Ocurrio un erro al crear las imagenes " + JSON.stringify(err))
            }
          })
        }
        return exits.success();
      }
    }
  }


};

