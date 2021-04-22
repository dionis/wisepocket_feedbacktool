var faker = require('faker');

module.exports = {


  friendlyName: 'Seed userendEn',


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


    registerSize = 201
    registerSize1 = 201
    registerSize2 = 50

    for (var iValue = 1; iValue < registerSize; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)

      /* let opinion = await Opinion.count({ 'userend': userEndObjet.id })
       let pregunta = await Pregunta.count({ 'quesUserend': userEndObjet.id })
       let campOp = await Opinion.count({ 'campaign': campOgjet.id })
       let campPreg = await Pregunta.count({ 'campaign': campOgjet.id })*/


      if (iValue < 201) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: faker.date.recent(5),
          idioma: 'ingles',
          polaridad: 'positiva',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

      }

    }
  
    for (var iValue = 1; iValue < registerSize1; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)

      if (iValue < 201) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: faker.date.recent(7),
          idioma: 'ingles',
          polaridad: 'negativa',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

      }
    }
    for (var iValue = 1; iValue < registerSize2; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)
      if (iValue < 50) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: faker.date.recent(4),
          idioma: 'ingles',
          polaridad: 'neutra',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

      }
      opinAll = await Opinion.find({})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 31) {
        newAspect = {
          texto: faker.lorem.word(1),
          polaridad: 'negativa',
          start: 2,
          end: 5,
          opinion: opinObjet.id
        }

        await AspectoOpinion.create(newAspect)

      }

      if (iValue < 21) {
        newAspect = {
          texto: faker.lorem.word(1),
          polaridad: 'neutra',
          start: 2,
          end: 5,
          opinion: opinObjet.id
        }

        await AspectoOpinion.create(newAspect)

      }

      let entdOpin = await EntidadOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 31) {
        newEntidad = {
          texto: faker.lorem.word(1),
          start: 12,
          end: 18,
          opinion: opinObjet.id
        }

        await EntidadOpinion.create(newEntidad)

      }
      /* if (pregunta < 10 || campPreg < 20) {
         newPregunta = {
           texto: faker.lorem.sentences(4, ''),
           fecha: faker.date.recent(7),
           quesUserend: userEndObjet.id,
           campaign: campOgjet.id
         }
         await Pregunta.create(newPregunta)
       }*/
    }
    return exits.success("OK");
  }
};
