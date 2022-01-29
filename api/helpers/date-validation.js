module.exports = {


  friendlyName: 'Date validation',


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
    var result = {}
    var initialDate = req.param('initialDate');
    var finalDate = req.param('finalDate');

    if (!finalDate && (!initialDate || !_.isDate(initialDate))) {
      result = {response:"ERROR", message:'Invalid date format for initialDate'};
    }
    else
      result.finalDate = finalDate

    if (!initialDate &&  (!finalDate || !_.isDate(finalDate))) {
      result = {response:"ERROR", message: 'Invalid date format for finalDate.'};
    }
    else
      result.initialDate = initialDate

    result.query = {}
    if (initialDate && finalDate && !result.response) {
      result.query.date= {">=": new Date(req.param('initialDate')),"<=":new Date(req.param('finalDate'))}
    }
    else if (initialDate  && !result.response) {
      result.query.date= {">=": new Date(req.param('initialDate'))}
    }
    else if ( !result.response){

      result.query.date= {"<=":new Date(req.param('finalDate'))}
    }

    callback(result)
  }


};

