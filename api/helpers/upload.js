module.exports = {
  friendlyName: 'Upload',

  description: 'Upload something.',

  inputs: {
    campaing: {
      type: 'string',
      description: 'Campaing identifier in database',
      example: '34453',
      required: true,
    },
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    let req = inputs.req;
    let res = inputs.res;
    let varcampaing = inputs.campaing;

    req.file('uploadedfile').upload(
      {
        // don't allow the total upload size to exceed ~50MB
        //maxBytes:50000000,
      },
      async function whenDone(err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }

        //console.log("What is --> " + uploadedFiles[0].fd)
        // console.log("What is --> " + varcampaing)
        var objectToData = { campaing: varcampaing, uploadeds: uploadedFiles };

        let resultValue = await sails.helpers.processUpLoadfile.with(objectToData);
        //Validate its correct
        //Insert in database information
        //console.log(JSON.stringify(files));
        //console.log("err " + JSON.stringify(err))
        if (typeof resultValue === 'undefined') {
          return exits.success({
            status: 'ERROR',
            message: err.message
          });
        } else {
          return exits.success({
            mssg: 'OK',
            message: uploadedFiles.length + ' file(s) uploaded successfully!',
            result: resultValue,

          });
        }
        //  })

        //console.log("What is --> " + JSON.stringify(objectToData))
        // Citizen.find({}).limit(1).exec(function (err, restul){
        //   if (err) {
        //     console.log("Error")
        //     return exits.serverError(err);
        //   }
        //   // return res.json({
        //   //   status: "OK" })
        //   console.log("Processing")

        //   return exits.success({mssg:'OK'});
        // });

        //return res.ok();
      }
    );
  },
};
