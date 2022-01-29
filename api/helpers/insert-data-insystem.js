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
      response: "ERROR",
      message: "ERROR"
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
    var sourceReview = inputs.review
    var sourceCitizen = inputs.citizen
    var sourceInSystem = inputs.sourceInfo
    var source = inputs.source
   // console.log("--- View Other -----")
    if (typeof sourceInSystem === "undefined" || typeof sourceInSystem.id === "undefined" ) {
            await Source.create(source);
            console.log("--- View -----")
            sourceInSystem = await Source.find({
            type:source.type,
            email:source.email,
            phonenumber:source.phonenumber,
            imei:source.imei

               }).limit(1)
        
     
      }

     // console.log("Insert Citizen 1")
      // if ( typeof sourceInSystem !== "undefined" &&  typeof  sourceInSystem.directoryAddress !== "undefined")
                 
      //     result = await sails.helpers.insertCitizen( sourceReview, sourceCitizen, sourceInSystem)  
      //     return exits.success(result);
      // }
      // else { //Exist Source object in database 
       // console.log("Insert Citizen 2 " + JSON.stringify(sourceCitizen))       
        result = await sails.helpers.insertCitizen( sourceReview, sourceCitizen, sourceInSystem) 
      //  console.log("Result ---> " + JSON.stringify(result))
        return exits.success(result);

  }


};

