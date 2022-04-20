
module.exports = {
  friendlyName: 'Insert review',

  description: '',

  inputs: {
    review: {
      type: 'ref',
      description: 'Review insert definition object',
      required: true,
    },
    source: {
      type: 'ref',
      description: 'Source insert definition object',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
    errorNotCampaing: {
      message: 'Undefined campaing in review',
    },
    errorNotInsert: {
      message: 'Review  wasn\'t insert',
    },
  },

  fn: async function (inputs, exits) {
    // TODO
    let review = inputs.review;
    let source = inputs.source;

    if (typeof review.campaing === 'undefined') {
      throw exits.errorNotCampaing();
    } else {
      review.source = source.id;
      await Review.create(review);
      //console.log("Valores---->>> " + JSON.stringify(review))
      let newReview = await Review.find({
        type: review.type,
        date: review.date,
        status: review.status,
        data: review.data,
      });

      await sails.helpers
        .insertImages(newReview, source)
        .tolerate('noImageFound', () => {
          ///Not image found to insert
        });
      if (newReview !== undefined) {return exits.success(newReview[0]);}
      else {throw exits.errorNotInsert();}
    }
  },
};
