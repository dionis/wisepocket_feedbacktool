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


    for (var iValue = 1; iValue < registerSize; iValue++) {

      gateWayArray.push({
        name_alias: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName())

      })
    }

    await UserEnd.createEach(gateWayArray)

    allGateway = await UserEnd.find({})
    campAll = await Campaign.find({})


    registerSize = 31

    for (var iValue = 1; iValue < registerSize; iValue++) {


      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)


      let opinion = await Opinion.count({ 'userend': userEndObjet.id })
      let pregunta = await Pregunta.count({ 'quesUserend': userEndObjet.id })
      let campOp = await Opinion.count({ 'campaign': campOgjet.id })
      let campPreg = await Pregunta.count({ 'campaign': campOgjet.id })


      if (opinion < 31) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: "21-3-2021",
          idioma: 'español',
          polaridad: 'positiva',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

      }



      return exits.success("OK");
    }
  }
};
