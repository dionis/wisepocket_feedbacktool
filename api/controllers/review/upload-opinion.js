module.exports = {
  friendlyName: 'Upload opinion',

  description: '',

  inputs: {
    campaingid: {
      type: 'string',
      description: 'Campaing identifier in database',
      example: '34453',
      required: true,
    },
  },

  exits: {},

  //   Successfully generated:
  //  •- api/controllers/review/upload-opinion.js

  // A few reminders:
  //  (1)  For most projects, you'll need to manually configure an explicit route
  //       in your `config/routes.js` file; e.g.
  //           'POST /api/v1/review/upload-opinion': { action: 'review/upload-opinion' },

  //  (2)  If you are using the built-in JavaScript SDK ("Cloud") for AJAX requests
  //       from client-side code, then after configuring a new route, you'll want to
  //       regenerate the SDK setup file using:
  //           sails run rebuild-cloud-sdk

  //  (3)  This new action was generated in the "actions2" format.
  //         [?] https://sailsjs.com/docs/concepts/actions

  //  (4)  Last but not least, since adding an action or route is a backend change,
  //       don't forget to re-lift the server before testing!

  fn: async function (inputs, exist) {
    var camapingid = this.req.param('campaingid');
    console.log('-----: ' + this.req.param('campaingid'));
    const res = this.res;
    const req = this.req;
    let result = await Campaign.find({ id: camapingid }).limit(1);

    if (typeof result === 'undefined' || result.length === 0)
      return res.json({
        status: 'Error',
        messg: 'Not exist Public Campaing in WisePocket\'s plataform',
      });
    camapingid = result[0].id;
    // await Citizen.find({}).limit(1)
    //dirname: require('path').resolve(sails.config.appPath, 'uploadzip/')
    result = await sails.helpers.upload.with({
      campaing: camapingid,
      req: this.req,
    });
    console.log('<======= End Send Service Insert =====>')
    return res.json({
      status: 'OK',
    });
    //console.log("---------------------------------0000000000000000000------------------------")
  },
};
