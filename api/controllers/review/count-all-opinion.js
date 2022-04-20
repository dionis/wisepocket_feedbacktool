module.exports = {


  friendlyName: 'Count all opinion',


  description: 'Give review\'s number at database',


  inputs: {
    page:{
      type:'number',
      description:"Page number for pagination effect",
      example:45
    },
    len:{
      type:'number',
      description:"Number of citizen for each page",
      example:20

    },
    campaingid:{
      type:'number',
      description:"Campaing identifier",
      example:234,
      required: true
    },
    initialDate:{
      type:'string',
      description:"Initial date for search opinion",
      example:'2020-02-23 20:34'
    },
    finalDate:{
      type:'string',
      description:"End date for search opinion",
      example:'2020-03-10 06:34'    
    }
  },


  exits: {
     
  },


  fn: async function (inputs) {
    //console.log("In controller count-all-opinion")

    // All done.
 
    //this.res.send("OK");
    allReviews = await Review.count({})
    //await this.res.json({reviews:allReviews})
    return this.res.json({mssg:'OK', reviews:allReviews});
    //return exits.success({result: "!!!Sucessful"});

  }


};
