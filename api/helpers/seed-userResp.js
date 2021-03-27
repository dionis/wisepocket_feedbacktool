
var faker = require('faker');

module.exports = {


  friendlyName: 'Seed userResp',


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

    allGateway = await UserEnd.find({})
    campAll = await Campaign.find({})
    pregAll = await Pregunta.find({})

    for (var iValue = 1; iValue < registerSize; iValue++) {

      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)
      pregObjet = faker.random.arrayElement(pregAll)

      let users = await Respuesta.count({ 'userRes': userEndObjet.id })
      let pregunta = await Respuesta.count({ 'ques': pregObjet.id })
      let campPreg = await Respuesta.count({ 'campaign': campOgjet.id })
      if (users < 10 || pregunta < 10 || campPreg < 51) {
        gateWayArray.push({
          texto: faker.lorem.sentences(6, ''),
          fecha: faker.date.recent(7),
          userRes: userEndObjet.id,
          ques: pregObjet.id,
          campaign: campOgjet.id

        })
      }
    }

    await Respuesta.createEach(gateWayArray)

    return exits.success("OK");
  }


};
