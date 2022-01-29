module.exports = {


  friendlyName: 'Insert citizen',


  description: 'Add the opinion\'s owner data to the WisePocket platform',


  inputs: {
    sourceReview:{
      type: 'ref',
      description: 'Review insert definition object',
      required: true
    },
    sourceCitizen:{
      type: 'ref',
      example: '\{ name:Pepe, address:Calle 5ta y Ave Lutero #4533, phone:2344334433   \}',
      description: 'The citizen information wich send the opinion',
      required: true  
    },
    sourceInSystem:{
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


  fn: async function (inputs, exits) {
    // TODO

    ///Only if all parameters aren't undefined
    var sourceCitizen = inputs.sourceCitizen
    var sourceReview = inputs.sourceReview
    var sourceInSystem = inputs.sourceInSystem

    if (typeof sourceCitizen !== "undefined" && typeof sourceReview !== "undefined" && typeof sourceInSystem !== "undefined") {

      ///find a citizen with same contact data
      //if in some case it's modify create a new citizen
      //console.log("<<<<< Information exist >>>>>>")
      Citizen.findOne({
        name:sourceCitizen.name,
        lastname:sourceCitizen.lastname,
        address: sourceCitizen.address,
        phonenumber: sourceCitizen.phone,
        email:sourceCitizen.email                            
         }).exec(async function (err, resultCitizen) {
        if (err) {
          //console.log("Error!!!!!")
          exits.error(err)
        }
        else {
          sourceReview.source = sourceInSystem;
          ///If not exit citizen create and asociated source info
          if (typeof resultCitizen === "undefined") {
            console.log("Insert Citizen " + JSON.stringify(resultCitizen))
            console.log("--> " + JSON.stringify(sourceCitizen))
            await Citizen.create(sourceCitizen)
            citizendInfoEx = await Citizen.find({
                            name:sourceCitizen.name,
                            lastname:sourceCitizen.lastname,
                            address: sourceCitizen.address,
                            phonenumber: sourceCitizen.phone,
                            email:sourceCitizen.email                            
                             }).limit(1)
   
            //console.log("Citizen Info length " + citizendInfoEx.length)
            sourceReview.citizen = citizendInfoEx[0].id;
            console.log(" ---> " + JSON.stringify(sourceReview))
            console.log(" ---> " + JSON.stringify(sourceInSystem))
            insertReview = await sails.helpers.insertReview.with({
              review:sourceReview,
              source:sourceInSystem
           })
            ///Update citizen relation with source
            console.log("----- 000 " + JSON.stringify(citizendInfoEx[0]))
            console.log("----- 001 " + JSON.stringify(sourceInSystem))
            result = await sails.helpers.updateCitizenSource.with({
                sourceCitizen:citizendInfoEx[0],
                sourceInSystem:sourceInSystem
              }).tolerate('notUpdateData',()=>{
                throw new Error("Not exist data to update")
              })     
           // console.log("Actualizar datos!!!!!")
            return exits.success({opinion:insertReview});
          }
          else {
            sourceReview.citizen = resultCitizen.id;
            insertReview = await sails.helpers.insertReview.with({
                                                              review:sourceReview,
                                                              source:sourceInSystem
                                                           })
           
            ///Update citizen relation with source
            console.log("Citizen values ---> " + JSON.stringify(resultCitizen))
            console.log("Source values ---> " + JSON.stringify(sourceInSystem))
             result = await sails.helpers.updateCitizenSource.with({
                                                           sourceCitizen:resultCitizen,
                                                           sourceInSystem:sourceInSystem
                                                        })
            
             console.log("Return SUCESSFUL")                             
            return exits.success({opinion:insertReview});

          }
        }
      })
    }
    else {
      //console.log("Not return")
      callback("Error", null);
    }
  }


};

