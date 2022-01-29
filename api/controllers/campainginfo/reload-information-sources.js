module.exports = {


  friendlyName: 'Reload information sources',


  description: '',


  inputs: {
    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    campaingid = inputs.campaingid

    result = await  sails.helpers.readUpdateInformation()
    return this.res.json({mssg:'reload ok'});

  }


};
