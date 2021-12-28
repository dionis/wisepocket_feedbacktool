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

    var registerSize = 5;

    var REGISTER_SIZE = 5;
    var REGISTER_SIZE1 = 5;

    let data = new Date()
    console.log("Data to show ", data);
    let dateWithMomentParser = moment().format('YYYY-MM-DD');
    console.log("Date parser ===> " + dateWithMomentParser);
    let dateToFind =  moment(data, 'YYYY-MM-DD hh:mm a', true);

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
       var dayForSearch = initDataToday.add(faker.random.arrayElement([30,50]),"minutes")
       //.add(2, 'hour');
       console.log("Date internval Today ", dayForSearch.format("YYYY-MM-DD hh:mm a"));
       hourInDayIntervalToday.push(dayForSearch.clone())
    }


    dateInMoment = initDataYesterday;
    hourInDayIntervalYesterday.push(initDataYesterday)
    for ( var i = 0; i < intervalInHour; i++ ){
       var dayForSearch = initDataYesterday.add(2, 'hour');
       console.log("Date internval Yesterday ", dayForSearch.format("YYYY-MM-DD hh:mm a"));
       hourInDayIntervalYesterday.push(dayForSearch.clone())
    }

    let dayLength = 7;
    arrayInDays.push(yesterDay.clone());
    for (var iDayValue = 1; iDayValue < dayLength; iDayValue++ ){
      var date = yesterDay.subtract(1 , 'days').add(iDayValue, 'hours');
      arrayInDays.push(date.clone());
    }

    // arrayInDays.forEach(item=>{
    //   console.log("Several times ",  moment(item).format('YYYY-MM-DD HH:mm a') );
    // })


    for (var iValue = 1; iValue < REGISTER_SIZE; iValue++) {

      gateWayArray.push({
        name_alias: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName())

      })
    }

    await UserEnd.createEach(gateWayArray)

    allGateway = await UserEnd.find({})
    campAll = await Campaign.find({})


    registerSize = 300
    var opinionSize = 201;
    let opinionArray = ['positiva','negativa','neutra']
    for (var iValue = 1; iValue < REGISTER_SIZE1; iValue++) {

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

      var toDayCurrentTime = (faker.random.arrayElement([true,false]))? faker.random.arrayElement(hourInDayIntervalToday):faker.random.arrayElement(hourInDayIntervalYesterday);
      var dateObjetToday = new Date(toDayCurrentTime);
      var timestampToDay = dateObjet.getTime();


      let endMoment = moment(toDayCurrentTime,"YYYY-MM-DD hh:mm a").add(60,"minutes").format("YYYY-MM-DD hh:mm a");

      let dateBetWeen = faker.date.between(toDayCurrentTime, endMoment);
      let dateBetWeenMoment = moment(dateBetWeen);


      let dayNameArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      //console.log("Date day ", currentTime.toLocaleString('en-US', {weekday:'long'}));

     // console.log("Time ====>> " ,  currentTime)


      //console.log("# Day ", dateObjet.getDay(), " = Day Name: ",dayNameArray[dateObjet.getDay()] );
      //console.log("TimeStamp ====>> " ,timestamp);
      //currentTime.toLocaleString('en-US', {weekday:'long'})
      if (opinion < opinionSize) {
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

        for ( var iDate = 1; iDate < (4); iDate++){

          newOpinion = {
            texto: faker.lorem.sentences(6, ''),
            fecha: dateBetWeen,
            createDay: dateBetWeenMoment.format('dddd'),
            idioma: 'español',
            polaridad:faker.random.arrayElement(opinionArray),
            userend: userEndObjet.id,
            campaign: campOgjet.id
          }

          await Opinion.create(newOpinion)
       }

      }

      opinAll = await Opinion.find({idioma: 'español'})

      opinObjet = faker.random.arrayElement(opinAll)

      let aspecOpin = await AspectoOpinion.count({ 'opinion': opinObjet.id })

      if (iValue < 101) {

        opinAll.forEach(async element =>{
          newAspect = {
            texto: faker.lorem.word(1),
            polaridad: 'positiva',
            start: 30,
            end: 35,
            opinion: element.id
          }

          await AspectoOpinion.create(newAspect)

        })

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


      }
    }
    return exits.success("OK");
  }

};
