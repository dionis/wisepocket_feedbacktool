var faker = require('faker');
var moment = require('moment'); // require
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

    let data = new Date()
    console.log("Data to show ", data);
    let dateWithMomentParser = moment().format('YYYY-MM-DD');
    console.log("Date parser ===> " + dateWithMomentParser);
    let dateToFind =  moment(data, 'YYYY-MM-DD HH:mm a', true);

    //console.log(" Date to find ", dateToFind);
    let yesterDay = dateToFind.clone();

    let yesterDayTemp = yesterDay.subtract(1 , 'days').add(5, 'hours').clone();

    let arrayInDays = [];
    let arrayToDayYestDay = [];

    arrayToDayYestDay.push(dateToFind);
    arrayToDayYestDay.push(yesterDayTemp);

    let dayLength = 7;
    arrayInDays.push(yesterDay.clone());
    for (var iDayValue = 1; iDayValue < dayLength; iDayValue++ ){
      var date = yesterDay.subtract(1 , 'days').add(iDayValue, 'hours');
      arrayInDays.push(date.clone());
    }
    // arrayInDays.forEach(item=>{
    //   console.log("Several times ",  moment(item).format('YYYY-MM-DD HH:mm a') );
    // })


    for (var iValue = 1; iValue < registerSize; iValue++) {

      gateWayArray.push({
        name_alias: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName())

      })
    }

    await UserEnd.createEach(gateWayArray)

    allGateway = await UserEnd.find({})
    campAll = await Campaign.find({})


    registerSize = 300

    for (var iValue = 1; iValue < registerSize; iValue++) {


      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)


      let opinion = await Opinion.count({ 'userend': userEndObjet.id })
      /*let pregunta = await Pregunta.count({ 'quesUserend': userEndObjet.id })
      let campOp = await Opinion.count({ 'campaign': campOgjet.id })
      let campPreg = await Pregunta.count({ 'campaign': campOgjet.id })*/
      //var currentTime = faker.date.recent(3);
      var currentTime =faker.random.arrayElement(arrayInDays)
      var dateObjet = new Date(currentTime);
      var timestamp = dateObjet.getTime();

      var toDayCurrentTime = faker.random.arrayElement(arrayToDayYestDay);
      var dateObjetToday = new Date(toDayCurrentTime);
      var timestampToDay = dateObjet.getTime();

      let dayNameArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      console.log("Date day ", currentTime.toLocaleString('en-US', {weekday:'long'}));

     // console.log("Time ====>> " ,  currentTime)


      //console.log("# Day ", dateObjet.getDay(), " = Day Name: ",dayNameArray[dateObjet.getDay()] );
      //console.log("TimeStamp ====>> " ,timestamp);
  //currentTime.toLocaleString('en-US', {weekday:'long'})
      if (opinion < 201) {
        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: dateObjet,
          createDay: currentTime.format('dddd'),
          idioma: 'español',
          polaridad: 'positiva',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: dateObjetToday,
          createDay: toDayCurrentTime.format('dddd'),
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

      if (iValue < 101) {
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
      /*if (iValue < 10) {

        var currentTime = faker.date.recent(7);
        var dateObjet = new Date(currentTime);
        var timestamp =  dateObjet.getTime();

        newPregunta = {
          texto: faker.lorem.sentences(4, ''),
          fecha: currentTime,
          currentime: String.toString(timestamp),
          quesUserend: userEndObjet.id,
          campaign: campOgjet.id
        }
        await Pregunta.create(newPregunta)
      }*/

    }

    return exits.success("OK");
  }
};
