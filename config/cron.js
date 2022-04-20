/**
 * Created by Dionis on 09/05/2017.
 */
/**
 * Created by dionis on 6/16/2016.
 */

//"0 0 0 1 * *
module.exports.cron = {
  secondJob: {
    schedule: '* 30 * * * *',
    onTick: async function () {

      //****************************************************************** */

      //INIT READ NEW EMAIL SENDED

      //READ SOME SERVICES BY CRON SHEDULER
      //NOW COVID-19 Cuban statistics
      //******************************************************************* */

      await  sails.helpers.readStadisticServices.with();

      console.log('<<<<<<<*************** READ STADISTIC ******************>>>>>>>');
    },
    onComplete: function () {
      //console.log('I am triggering when job is complete');
    },
    start: true // Start task immediately

  },
  // cleanJob: {
  // //   schedule: '00 30 12 1 * *',
  // //   onTick: function () {
  // //     console.log("***************************************************************")
  // //     console.log("Clean task");
  // //     console.log("***************************************************************")

  // //     CleanServices.removeReview( new Date(), function (err, result){
  // //       if ( typeof err  !== "undefined"){
  // //         console.log(" !!! Sucessful clean !!!! "  +  JSON.stringify(result));


  // //       }
  // //     });
  // //   },
  //   onComplete: function () {
  //     console.log('I am triggering when job clean is complete');
  //   },
  //   start: true // Start task immediately

  // }
};

