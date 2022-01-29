module.exports = {


  friendlyName: 'Available opioninsert',


  description: '',


  inputs: {
    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    },

  },


  exits: {

  },

//   Successfully generated:
//   •- api/controllers/review/available-opioninsert.js
 
//  A few reminders:
//   (1)  For most projects, you'll need to manually configure an explicit route
//        in your `config/routes.js` file; e.g.
//            'POST /api/v1/review/available-opioninsert': { action: 'review/available-opioninsert' },
 
//   (2)  If you are using the built-in JavaScript SDK ("Cloud") for AJAX requests
//        from client-side code, then after configuring a new route, you'll want to
//        regenerate the SDK setup file using:
//            sails run rebuild-cloud-sdk
 
//   (3)  This new action was generated in the "actions2" format.
//          [?] https://sailsjs.com/docs/concepts/actions
 
//   (4)  Last but not least, since adding an action or route is a backend change,
//        don't forget to re-lift the server before testing!
  fn: async function (inputs) {
    idcamapg = inputs.campaingid
    // All done.
    existcampaig = await Campaing.find({numcamp:idcamapg}).limit(1)

    if (existcampaig !== undefined) 
      return this.res.json({mssg:'OK'});
      
    return this.res.json({mssg:'ERROR'});

  }


};
