module.exports = {

  friendlyName: 'Insert data insystem',

  description: 'Add information about some opinion or request at the WisPocket platform',

  inputs: {
    review:{
      type: 'ref',
      description: 'Review model definition object',
      required: true
    }, citizen:{
      type: 'ref',
      example: '\{ name:Pepe, address:Calle 5ta y Ave Lutero #4533, phone:2344334433   \}',
      description: 'The citizen information wich send the opinion',
      required: true

    }, sourceInfo: {
      type: 'ref',
      description: 'Source model definition object',
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
      response: 'ERROR',
      message: 'ERROR'
    }

  },

  //   A few reminders:
  //  (1)  To call this helper:

  //           // With default usage:
  //           await sails.helpers.insertDataInsystem(…, …);

  //           // With named parameters:
  //           await sails.helpers.insertDataInsystem.with({
  //             someInput: …,
  //             someOtherInput: …
  //           });

  fn: async function( inputs, exits) {
    // TODO
    var sourceReview = inputs.review;
    var sourceCitizen = inputs.citizen;
    var sourceInSystem = inputs.sourceInfo;
    var source = inputs.source;
    // console.log("--- View Other -----")
    if (typeof sourceInSystem === 'undefined' || typeof sourceInSystem.id === 'undefined' ) {
      await Source.create(source);
      console.log('--- View -----');
      sourceInSystem = await Source.find({
        type:source.type,
        email:source.email,
        phonenumber:source.phonenumber,
        imei:source.imei

      }).limit(1);


    }

    // console.log("Insert Citizen 1")
    // if ( typeof sourceInSystem !== "undefined" &&  typeof  sourceInSystem.directoryAddress !== "undefined")

    //     result = await sails.helpers.insertCitizen( sourceReview, sourceCitizen, sourceInSystem)
    //     return exits.success(result);
    // }
    // else { //Exist Source object in database
    // console.log("Insert Citizen 2 " + JSON.stringify(sourceCitizen))
    let result = await sails.helpers.insertCitizen( sourceReview, sourceCitizen, sourceInSystem);
    //  console.log("Result ---> " + JSON.stringify(result))

    //#################################################################
    ///Call NLP Web Services and Process Opiniones

    // newReview = await Review.find({
    //   sourceReview.campaing
    //   type:review.type,
    //   date:review.date,
    //   status:review.status,
    //   data:review.data
    //  }) and id
    //  ///Add the campaing id
    //  result.id_campaign = sourceReview.campaing
    //  result.id_opinion = result.id
    //  result.textopinion = result.data


    //  await sails.helpers.callNlpRemoteWebServices(result)
    //       .then(_=>{console.log("Opinion was sended to NLP Processing Module")})
    //       .catch(err => console.error("Error in NLP Opinion in system ", err ))
    var aspectText = '';

    //console.log(' Review Insert ', result);

    if (typeof result === 'undefined' || typeof result.opinion === 'undefined') {
      return exits.error();
    }

    console.log(' <=== NLP SERVICE CALL PARAMETERS ===>');
    console.log('Review text: ', sourceReview.data);
    console.log('Aspect text: ', aspectText);
    console.log('Opinion id: ', result.opinion.id);
    console.log('Campaign id: ',sourceReview.campaign );
    let sourceText = {};
    sourceText.textreview  = ''+sourceReview.data;
    sourceText.aspect = ' ';
    sourceText.opinionid =  ''+result.opinion.id;
    sourceText.camapaignid = ''+sourceReview.campaign;
    console.log('--- CALL ----');
    sails.helpers
    .nlpSentimentAnalysisCall(
      sourceText.textreview,
      sourceText.aspect,
      sourceText.opinionid,
      sourceText.camapaignid
    ).tolerate('callServiceError', ()=>{
      console.log('<==== Error ====> ' );
      console.log('<==== Error ====> ' );
      console.log('<==== Write RECORD IN LOG ABOUT BAT CALL TO NLP SERVICES====>');
    })
    .then((result)=>{
      console.log('<==== SUCESSFUL CALL TO NLP SERVICES ====> ' );
      console.log(result);
      //return done();
    });
    //###################################################################
    return exits.success(result);

  }


};

