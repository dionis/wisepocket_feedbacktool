var faker = require('faker');

module.exports = {


  friendlyName: 'Seed EstadistIdioma',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  //   A few reminders:
  //  (1)  To call this helper:

  //           // With default usage:
  //           await sails.helpers.seedGatwaySupport(…, …);

  //           // With named parameters:
  //           await sails.helpers.seedGatwaySupport.with({
  //             someInput: …,
  //             someOtherInput: …
  //           });

  fn: async function (inputs, exits) {
    // TODO

    arrayStatus = ['online', 'offline']

    var gateWayArray = []

    var registerSize = 10;
    camp = await Campaign.find({})

    for (var iValue = 1; iValue < registerSize; iValue++) {
      campOgjet = faker.random.arrayElement(camp)
      gateWayArray.push({
        campaign: campOgjet.id
      })
    }

    await EstadisticaByidioma.createEach(gateWayArray)


    return exits.success("OK");
  }
};
