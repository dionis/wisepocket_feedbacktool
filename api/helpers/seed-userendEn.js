const { variance } = require('d3-array');
var faker = require('faker');
var moment = require('moment'); // require

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

    var PARACIAL_DATA_SEED = 10; //501
    var REGISTER_SIZE = 20;
    var REGISTER_SIZE1 = 20;
    var REGISTER_SIZE2 = 20;


    for (var iValue = 1; iValue < registerSize; iValue++) {

      gateWayArray.push({
        name_alias: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName())

      })
    }

    await UserEnd.createEach(gateWayArray)

    allGateway = await UserEnd.find({})
    campAll = await Campaign.find({})


    registerSize = REGISTER_SIZE;
    registerSize1 = REGISTER_SIZE1;
    registerSize2 = REGISTER_SIZE2;

    let data = new Date()
    console.log("Data to show ", data);
    let dateWithMomentParser = moment().format('YYYY-MM-DD');
    console.log("Date parser ===> " + dateWithMomentParser);
    let dateToFind =  moment(data, 'YYYY-MM-DD hh:mm a', true);

    //console.log(" Date to find ", dateToFind);
    let yesterDay = dateToFind.clone();

    let yesterDayTemp = dateToFind.clone();

    yesterDayTemp = yesterDay.subtract(1 , 'days').add(5, 'hours').clone();

    let arrayInDays = [];
    let arrayToDayYestDay = [];

    let hourInDayIntervalToday = [];
    let hourInDayIntervalYesterday = [];


    let intervalInHour = 12;
    console.log("In function by Interval")


    let initDataToday = dateToFind.hour(0)
    //.format("YYYY-MM-DD HH:mm a");
    let initDataYesterday = yesterDay.hour(0)
    //.format("YYYY-MM-DD HH:mm a");

    arrayToDayYestDay.push(dateToFind);
    arrayToDayYestDay.push(yesterDayTemp);

    let dateInMoment = initDataToday;
    hourInDayIntervalToday.push(initDataToday)
    for ( var i = 0; i < intervalInHour; i++ ){
       //console.log("Hour interval ", dateToFind)
       //let dayForSearch = dateToFind.add(2, 'hour').format("YYYY-MM-DD HH:mm a");
       dateInMoment = initDataToday.clone();
       var dayForSearch = dateInMoment.add(2, 'hour')
       //.add(2, 'hour');
       console.log("Date internval Today ", dayForSearch.format("YYYY-MM-DD hh:mm a"));
       hourInDayIntervalToday.push(dayForSearch.clone())
    }


    initDataYesterday.add(5, 'hour')

    hourInDayIntervalYesterday.push(initDataYesterday)
    for ( var i = 0; i < intervalInHour; i++ ){
       dateInMoment = initDataYesterday.clone();
       var dayForSearch = dateInMoment.add(2, 'hour')
       //
       console.log("Date internval Yesterday ", dayForSearch.format("YYYY-MM-DD hh:mm a"));
       hourInDayIntervalYesterday.push(dayForSearch.clone())
    }


    ///Compute data for 7 day after current day

    let dayLength = 7;
    arrayInDays.push(yesterDay.clone());
    for (var iDayValue = 1; iDayValue < dayLength; iDayValue++ ){
      var date = yesterDay.subtract(1 , 'days').add(iDayValue, 'hours');
      arrayInDays.push(date.clone());
    }

    var parcialDataSeed = PARACIAL_DATA_SEED;
    for (var iValue = 1; iValue < registerSize; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)

      /* let opinion = await Opinion.count({ 'userend': userEndObjet.id })
       let pregunta = await Pregunta.count({ 'quesUserend': userEndObjet.id })
       let campOp = await Opinion.count({ 'campaign': campOgjet.id })
       let campPreg = await Pregunta.count({ 'campaign': campOgjet.id })*/

      // How  faker.date.recent(5) set a date = "2021-04-23T14:49:00.099Z"
      //faker.time.recent(7) is a timestamp

      if (iValue < parcialDataSeed) {
        // var currentTime = faker.date.recent(5);
        //************************************************* */
        //Select some date since current time to seven days before
        //*********************************************************** */
        var currentTime =faker.random.arrayElement(arrayInDays)
        var dateObjet = new Date(currentTime);
        var timestamp = dateObjet.getTime();

        var toDayCurrentTime = (faker.random.arrayElement([true,false]))? faker.random.arrayElement(hourInDayIntervalToday):faker.random.arrayElement(hourInDayIntervalYesterday);
        var dateObjetToday = new Date(toDayCurrentTime);
        var timestampToDay = dateObjet.getTime();
        let endMoment = moment(toDayCurrentTime,"YYYY-MM-DD hh:mm a").add(60,"minutes").format("YYYY-MM-DD hh:mm a");


        //Get a random date between toDayCurrentTime and endMoment
        //using faker

        let dateBetWeen = faker.date.between(toDayCurrentTime, endMoment);
        let dateBetWeenMoment = moment(dateBetWeen);

        console.log(" Get a random date from " + toDayCurrentTime.format("YYYY-MM-DD hh:mm a") + " to " + endMoment );
        console.log(" The date is : ", dateBetWeenMoment.format("YYYY-MM-DD hh:mm a"));

        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: dateObjet,
          createDay: currentTime.format('dddd'),
          idioma: 'ingles',
          polaridad: 'positiva',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

        for ( var iDate = 1; iDate < (4); iDate++){
              newOpinion = {
                texto: faker.lorem.sentences(6, ''),
                fecha: dateBetWeen,
                createDay: dateBetWeenMoment.format('dddd'),
                idioma: 'ingles',
                polaridad: 'positiva',
                userend: userEndObjet.id,
                campaign: campOgjet.id
              }

              await Opinion.create(newOpinion)
        }
      }

      opinAll = await Opinion.find({})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 101) {

        opinAll.forEach( async element=>{
          newAspect = {
            texto: faker.lorem.word(1),
            polaridad: 'negativa',
            start: 2,
            end: 5,
            opinion: element.id
          }

          await AspectoOpinion.create(newAspect)

        })


      }

    }

    for (var iValue = 1; iValue < registerSize1; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)

      if (iValue < parcialDataSeed) {
        var currentTime = faker.random.arrayElement(arrayInDays)
        var dateObjet = new Date(currentTime);
        var timestamp = dateObjet.getTime();

        var toDayCurrentTime = (faker.random.arrayElement([true,false]))? faker.random.arrayElement(hourInDayIntervalToday):faker.random.arrayElement(hourInDayIntervalYesterday);
        var dateObjetToday = new Date(toDayCurrentTime);
        var timestampToDay = dateObjet.getTime();

        let endMoment = moment(toDayCurrentTime,"YYYY-MM-DD hh:mm a").add(60,"minutes").format("YYYY-MM-DD hh:mm a");

        let dateBetWeen = faker.date.between(toDayCurrentTime, endMoment);
        let dateBetWeenMoment = moment(dateBetWeen);

        // console.log(" Get a random date from " + toDayCurrentTime.format("YYYY-MM-DD hh:mm a") + " to " + endMoment );
        // console.log(" The date is : ", dateBetWeenMoment.format("YYYY-MM-DD hh:mm a"));


        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: dateObjet,
          createDay:  currentTime.format('dddd'),
          idioma: 'ingles',
          polaridad: 'negativa',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)

       for ( var iDate = 1; iDate < (4); iDate++){
          newOpinion = {
            texto: faker.lorem.sentences(6, ''),
            fecha: dateBetWeen,
            createDay: dateBetWeenMoment.format('dddd'),
            idioma: 'ingles',
            polaridad: 'negativa',
            userend: userEndObjet.id,
            campaign: campOgjet.id
          }

          await Opinion.create(newOpinion)
       }

      }

      opinAll = await Opinion.find({})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 101) {

        opinAll.forEach( async  element =>{

            newAspect = {
              texto: faker.lorem.word(1),
              polaridad: 'negativa',
              start: 2,
              end: 5,
              opinion: element.id
            }

            await AspectoOpinion.create(newAspect)


        })


      }

    }

    var lenghtSeedInsert = 171;
    for (var iValue = 1; iValue < registerSize2; iValue++) {
      userEndObjet = faker.random.arrayElement(allGateway)
      campOgjet = faker.random.arrayElement(campAll)
      if (iValue < lenghtSeedInsert) {

        var currentTime = faker.random.arrayElement(arrayInDays)
        var dateObjet = new Date(currentTime);
        var timestamp = dateObjet.getTime();

        var toDayCurrentTime = (faker.random.arrayElement([true,false]))? faker.random.arrayElement(hourInDayIntervalToday):faker.random.arrayElement(hourInDayIntervalYesterday);
        var dateObjetToday = new Date(toDayCurrentTime);
        var timestampToDay = dateObjet.getTime();

        let endMoment = moment(toDayCurrentTime,"YYYY-MM-DD hh:mm a").add(60,"minutes").format("YYYY-MM-DD hh:mm a");

        let dateBetWeen = faker.date.between(toDayCurrentTime, endMoment);
        let dateBetWeenMoment = moment(dateBetWeen);

        newOpinion = {
          texto: faker.lorem.sentences(6, ''),
          fecha: dateObjet,
          createDay: currentTime.format('dddd'),
          idioma: 'ingles',
          polaridad: 'neutra',
          userend: userEndObjet.id,
          campaign: campOgjet.id
        }

        await Opinion.create(newOpinion)


        for ( var iDate = 1; iDate < (4); iDate++){

            newOpinion = {
              texto: faker.lorem.sentences(6, ''),
              fecha: dateBetWeen,
              createDay: dateBetWeenMoment.format('dddd'),
              idioma: 'ingles',
              polaridad: 'neutra',
              userend: userEndObjet.id,
              campaign: campOgjet.id
            }
            await Opinion.create(newOpinion)
        }

      }
      opinAll = await Opinion.find({polaridad:'neutra'})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 70) {
        opinAll.forEach( async element =>{
            newAspect = {
              texto: faker.lorem.word(1),
              polaridad: 'negativa',
              start: 2,
              end: 5,
              opinion: element.id
            }

            await AspectoOpinion.create(newAspect)

        })


      }

      if (iValue < 41) {

        opinAll.forEach( async element =>{
          newAspect = {
            texto: faker.lorem.word(1),
            polaridad: 'negativa',
            start: 2,
            end: 5,
            opinion: element.id
          }

          await AspectoOpinion.create(newAspect)

      })

      }

      let entdOpin = await EntidadOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 31) {

        opinAll.forEach( async element =>{
          newEntidad = {
            texto: faker.lorem.word(1),
            start: 12,
            end: 18,
            opinion: element.id
          }

          await EntidadOpinion.create(newEntidad)

      })


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
