module.exports = {


  friendlyName: 'Page validation',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        callback({err: sails.__("ERROR_PAGE_INVALID")}, undefined);
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        callback({err: sails.__("ERROR_LEN_INVALID")}, undefined);
      }
    }

    callback(undefined, page, len)
  }


};

