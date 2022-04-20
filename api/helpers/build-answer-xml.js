module.exports = {


  friendlyName: 'Build answer xml',


  description: '',


  inputs: {

    reviews:{
      type:'ref',
      required:true,
      description:'Text in xml format'
    },
    source:{
      type:'json',
      required:true,
      description:'Review procedence'
    },
    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotExistInfomation:{
      description:'Not exist information'
    },
    ErrorNotSourceFind:{

    }

  },


  fn: async function (inputs, exits) {
    // TODO
    let reviews = inputs.reviews
    let source = inputs.source
    let campaing = inputs.campaingid
    console.log("----> buildAnswerXml <------")
    if (typeof reviews === "undefined" || typeof source === "undefined") {
       return exists.NotExistInfomation()
    }
    else {

     // console.log("Cantidad de Opiniones " +  reviews.length)
      //console.log("Text " + JSON.stringify(source))
      let query = {imei: source.imei}
      //console.log("Text ===> " + JSON.stringify(query))
      await Citizen.find({}).limit(1);
      //console.log("<===> " + JSON.stringify(query))
      await Source.find({}).limit(1);
      //console.log("Text ===> " + JSON.stringify(query))
      Source.find(query).limit(1).exec(async function (err, sourceInfo){

        if (err){
          // console.log("Error " + JSON.stringify(err))
            return exits.ErrorNotSourceFind(err)
        }
       // console.log("<--->")
        if (typeof sourceInfo !== "undefined")
        sourceInfo = sourceInfo[0]

        if (typeof sourceInfo === "undefined") {
          await Source.create(source);
          //console.log("<----33---->")
          sourceInfo =  await Source.find({imei: source.imei})
          //console.log("<----34---->")
          sourceInfo = sourceInfo[0]
        }

        //console.log("Fuente --> " + JSON.stringify(source));
        var directoryAddress = source.directoryAddress
        //console.log("Fuente :" + directoryAddress);
        var xmlToSend = "<WisePocket>";
        ////Fin all formationcenter id

        var currentDate = new Date();
        for ( const iInfo of reviews) {

            var objectToUpdate = {};
            var programTheme = {};
            var citizenInfo = {};
            var contactoInformation = {};

            // {"$":{"type":"felicitation","id":"45667"},"citizenid":["RTE33454544"],"programtitle":["El problema del agua en Santiago"],"data":[{"
            // contacto":[{"name":["Pedro Jose"],"lastname":["Moreno"],"adress":["Calle 10 Rpto Sueño, #264"],"phone":["2334345444"],"mail":["pedro
            // @nauta.cu"],"nickname":["El Bello"],"gps":[{"latitude":["23.3232"],"longitude":["54.333"]}]}],"title":["Viva el 1ro de Mayo"],"text"
            // :["Orgulloso de Santiago y sus activades"]}],"images":[{"image":["/199393.JPG"]}],"videos":["/fgdd.mp4"],"records":["/gardd.mp3"]}
            // console.log(JSON.stringify(iInfo))

            objectToUpdate.campaing =  campaing
            objectToUpdate.type = iInfo.$.type;
            objectToUpdate.data = iInfo.data[0].text[0];
            objectToUpdate.images = iInfo.images;
            objectToUpdate.videos = iInfo.videos;
            objectToUpdate.gps = iInfo.gps;
            objectToUpdate.taperecord = iInfo.records;
            objectToUpdate.date = currentDate;
            objectToUpdate.datelong =  String (currentDate.getTime());
            objectToUpdate.citizenid = iInfo.citizenid[0];
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

            //console.log("Insert Data in System <---> "   + JSON.stringify(sourceInfo))

            await sails.helpers.insertDataInsystem(objectToUpdate, citizenInfo, sourceInfo, sourceInfo)



          xmlToSend += "<info id=\"inserted\" />";
          console.log("-------->>>><<<<--------")

        }
        xmlToSend += "</WisePocket>"
        console.log("End process "  + JSON.stringify(xmlToSend))
        return  exits.success(xmlToSend)


      })

   }
  }

};

