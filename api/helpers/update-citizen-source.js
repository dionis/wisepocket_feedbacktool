module.exports = {


  friendlyName: 'Update citizen source',


  description: '',


  inputs: {
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
    notUpdateData:{
      description: "Not exist data to update"
    }
  },


  fn: async function (inputs, exits) {
    // TODO
    citizen = inputs.sourceCitizen;
    source = inputs.sourceInSystem

    if (typeof citizen !== "undefined" && typeof source !== "undefined") {
      console.log("Citizen identifier " + JSON.stringify(citizen.id));
      console.log("Source identifier " + JSON.stringify(source.id));
      result = await Citizen.addToCollection(citizen.id, 'sources', source.id);
      return exits.success("");
      
    }
    else throw  'notUpdateData' 
    
  }


};

