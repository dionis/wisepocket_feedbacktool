module.exports = {
  friendlyName: 'Process review xml',

  description: '',

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    // TODO
    console.log('Fuente ' + JSON.stringify(source));
    console.log('Fuente ' + directoryAddress);
    var xmlToSend = '<EnLineaContigo>';
    ////Fin all formationcenter id

    var currentDate = new Date();
    async.concat(
      reviews,
      (iInfo, callbackv) => {
        var objectToUpdate = {};
        var programTheme = {};
        var citizenInfo = {};
        var contactoInformation = {};
        source.directoryAddress = directoryAddress;

        //             {"$":{"type":"felicitation","id":"45667"},"citizenid":["RTE33454544"],"programtitle":["El problema del agua en Santiago"],"data":[{"
        //             contacto":[{"name":["Pedro Jose"],"lastname":["Moreno"],"adress":["Calle 10 Rpto Sueño, #264"],"phone":["2334345444"],"mail":["pedro
        // @nauta.cu"],"nickname":["El Bello"],"gps":[{"latitude":["23.3232"],"longitude":["54.333"]}]}],"title":["Viva el 1ro de Mayo"],"text"
        //             :["Orgulloso de Santiago y sus activades"]}],"images":[{"image":["/199393.JPG"]}],"videos":["/fgdd.mp4"],"records":["/gardd.mp3"]}

        // console.log(JSON.stringify(iInfo))

        objectToUpdate.type = iInfo.$.type;
        objectToUpdate.data = iInfo.data[0].text;
        objectToUpdate.images = iInfo.images;
        objectToUpdate.videos = iInfo.videos;
        objectToUpdate.gps = iInfo.gps;
        objectToUpdate.taperecord = iInfo.records;
        objectToUpdate.date = currentDate;
        objectToUpdate.datelong = String(currentDate.getTime());
        objectToUpdate.citizenid = iInfo.citizenid;
        objectToUpdate.title = iInfo.programtitle;
        programTheme.title = iInfo.programtitle;
        contactoInformation = iInfo.data[0].contacto[0];
        citizenInfo.name = contactoInformation.name[0];
        ///En la base de datos se define name de Citizen como name y lastname
        // citizenInfo.lastname = contactoInformation.lastname[0];
        citizenInfo.address = contactoInformation.address[0];
        citizenInfo.phonenumber = contactoInformation.phone[0];
        citizenInfo.email = contactoInformation.mail[0];
        citizenInfo.loginkey = contactoInformation.nickname[0];

        ///Obtener los datos del contacto
        ///Obtener los datos de la fuente
        ///Verificar si existe la fuente
        ///sino insertarla
        ///insertar el contacto
        ///Insertar la opinion

        ProcessInputReviewService.insertDataInSystem(
          objectToUpdate,
          citizenInfo,
          source,
          source,
          function (err, reviewInsert) {
            if (err) {
              callbackv({ response: 'ERROR', message: err.message }, null);
            } else {
              callbackv(null, reviewInsert.citizenid);
            }
          }
        );
      },
      (err, placeFormationAsociation) => {
        // files is now a list of filenames that exist in the 3 directories
        //console.log(JSON.stringify(placeFormationAsociation));
        if (err) callback(err, null);
        else {
          placeFormationAsociation.forEach(function (iValue) {
            xmlToSend += '<info id="' + iValue + '">';
            xmlToSend += '</info>';
          });
          xmlToSend += '</EnLineaContigo>';
          callback(null, xmlToSend);
        }
      }
    );
  },
};
