module.exports = {


  friendlyName: 'Lastupdate',


  description: 'Lastupdate campainginfo.',


  inputs: {
    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    }

  },


  exits: {

  },

  // •- api/controllers/campainginfo/lastupdate.js

  // A few reminders:
  //  (1)  For most projects, you'll need to manually configure an explicit route
  //       in your `config/routes.js` file; e.g.
  //           'POST /api/v1/campainginfo/lastupdate': { action: 'campainginfo/lastupdate' },
  
  //  (2)  If you are using the built-in JavaScript SDK ("Cloud") for AJAX requests
  //       from client-side code, then after configuring a new route, you'll want to
  //       regenerate the SDK setup file using:
  //           sails run rebuild-cloud-sdk
  
  //  (3)  This new action was generated in the "actions2" format.
  //         [?] https://sailsjs.com/docs/concepts/actions
  
  //  (4)  Last but not least, since adding an action or route is a backend change,
  //       don't forget to re-lift the server before testing!
  
  fn: async function (inputs) {

     // All done.
     campaingid = inputs.campaingid

     ///Update date
 
     ///Information
     result  = await Campaing.find({'numcamp':campaingid}).limit(1) 
 
     if (typeof result === 'undefined' || result.length ==0) {
       return this.res.send({
         status: "Error",
         messg:'Not exist Public Campaing in WisePocket\'s plataform' });
     }
     else {

        // All done.
        var timeArray = await TimeUpdate.find({});
        timeObject = timeArray[0]
        //console.log("Last information update was at " + time)
        return this.res.json({datatime:timeObject.time});
     }

  }


};
