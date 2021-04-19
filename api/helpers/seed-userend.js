var faker = require('faker');

module.exports = {


  friendlyName: 'Seed userend',


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


    registerSize = 80

    for (var iValue = 1; iValue < registerSize; iValue++) {


      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)


      let opinion = await Opinion.count({ 'userend': userEndObjet.id })
      /*let pregunta = await Pregunta.count({ 'quesUserend': userEndObjet.id })
      let campOp = await Opinion.count({ 'campaign': campOgjet.id })
      let campPreg = await Pregunta.count({ 'campaign': campOgjet.id })*/


      if (opinion < 81) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: faker.date.weekday('long'),
          idioma: 'español',
          polaridad: 'positiva',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

      }


      opinAll = await Opinion.find({})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 50) {
        newAspect = {
          texto: faker.lorem.word(1),
          polaridad: 'positiva',
          start: 30,
          end: 35,
          opinion: opinObjet.id
        }

        await AspectoOpinion.create(newAspect)

      }

      let entdOpin = await EntidadOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 50) {
        newEntidad = {
          texto: faker.lorem.word(1),
          start: 20,
          end: 25,
          opinion: opinObjet.id
        }

        await EntidadOpinion.create(newEntidad)

      }
      if (iValue < 10) {
        newPregunta = {
          texto: faker.lorem.sentences(4, ''),
          fecha: faker.date.recent(7),
          quesUserend: userEndObjet.id,
          campaign: campOgjet.id
        }
        await Pregunta.create(newPregunta)
      }

    }

    return exits.success("OK");
  }
};
