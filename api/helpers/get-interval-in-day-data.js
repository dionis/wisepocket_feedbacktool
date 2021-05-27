
var moment = require('moment'); // require
module.exports = {


  friendlyName: 'Get interval in day data',


  description: '',


  inputs: {
    camapingid: {
      type: 'string',
      example: '2312cddasda',
      description: 'Campaign ids.',
      required: true
    },
    date: {
      type: 'string',
      example: 'Ami',
      description: 'Date to find.',
      required: true
    },

    language: {
      type: 'string',
      example: 'ingles',
      description: 'Date to find.',
      defaultsTo:'ingles',
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Interval in day data',
    },

  },


  fn: async function (inputs,exits) {

    // Get interval in day data.
    var intervalInDayData;
    let hourInDayInterval = [];
    let intervalInHour = 12;
    console.log("In function by Interval")
    let cantDayResult = [];
    let aDate =  moment(inputs.date,"YYYY-MM-DD hh:mm a");
    let initData = aDate.hour(0).format("YYYY-MM-DD hh:mm a");


    //2- Find yesterday date
    hourInDayInterval.push(initData)
    console.log("Find yesterday date ", inputs.language)
    console.log("Find campaing id ",  inputs.camapingid)


    let language = inputs.language;

     //1- Compute all interval between init and interval
     let dateInMoment = aDate;
     for ( var i = 0; i < intervalInHour; i++ ){
        let dayForSearch = dateInMoment.add(2, 'hour').format("YYYY-MM-DD hh:mm a");
        hourInDayInterval.push(dayForSearch)
     }

     console.log("Compute all interval between init and interval")

     //3- Compute in parallel all opinion inner echa interval (today, yesterday)
     // var queryObj = {date: {'>=': begin, '<': end}};
     // Day.count(queryObj, newDay).exec(function(err, day) {
     //     console.log(day)
     // });

     console.log("Compute in parallel all opinion in each interval")
     await Promise.all(hourInDayInterval.map(async (item) => {
       console.log("<--- Execute query ---->||| <--- ")
       console.log(" Hour start ", item)
       let endMoment = moment(item,"YYYY-MM-DD hh:mm a").add(60,"minutes").format("YYYY-MM-DD hh:mm a")
       console.log(" Hour end ", endMoment)
       let opinion =  await Opinion.count({
                 campaign: inputs.camapingid,
                 fecha:  {'>=': item, '<': endMoment},
                 idioma: inputs.language
       });

       let opinionPositive =  await Opinion.count({
        campaign: inputs.camapingid,
        fecha:  {'>=': item, '<': endMoment},
        idioma:  inputs.language,
        polaridad: 'positiva'
        });

        let opinionNegative =  await Opinion.count({
          campaign: inputs.camapingid,
          fecha:  {'>=': item, '<': endMoment},
          idioma:  inputs.language,
          polaridad: 'negativa'
          });

          let opinionNeutral =  await Opinion.count({
            campaign: inputs.camapingid,
            fecha:  {'>=': item, '<': endMoment},
            idioma:  inputs.language,
            polaridad: 'neutral'
            });


         console.log("=== In these ===")
        // console.log("Opinion sizes ", opinion, " in date ==> ", item );
         let resultObject = {
           opinionsize:(typeof(opinion) === 'undefined')?0:opinion,
           opinionpositive:(typeof(opinionPositive) === 'undefined')?0:opinionPositive,
           opinionnegative:(typeof(opinionNegative) === 'undefined')?0:opinionNegative,
           opinionneutral:(typeof(opinionNeutral) === 'undefined')?0:opinionNeutral,
           date:item,
           dateName: moment(item,"YYYY-MM-DD hh:mm a").format('dddd'),
           dateHour: moment(item,"YYYY-MM-DD hh:mm a").format('hh a')
         }
        // console.log("Insert object in search ",resultObject );
         cantDayResult.push(resultObject )

    }));

      cantDayResult = cantDayResult.sort((a, b) =>moment(a.date,"YYYY-MM-DD hh:mm a").diff(moment(b.date,"YYYY-MM-DD hh:mm a")))

     // console.log("Data to send ", cantDayResult)

      return exits.success(cantDayResult);

    // Send back the result through the success exit.


  }


};

