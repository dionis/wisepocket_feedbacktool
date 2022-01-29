module.exports = {


  friendlyName: 'Find all',


  description: 'Give all review information in database',


  inputs: {
    page:{
      type:'number',
      description:"Page number for pagination effect",
      example:45,
     
    },
    len:{
      type:'number',
      description:"Number of citizen for each page",
      example:20,
     
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
      example:'2020-02-23 20:34',
    
    },
    finalDate:{
      type:'string',
      description:"End date for search opinion",
      example:'2020-03-10 06:34',
      
    }
  },


  exits: {
     
  },


  fn: async function (inputs) {
    //console.log("In controller count-all-opinion")

    // All done.

    var camapingid = this.req.param('campaingid')
    //console.log("-----: " + this.req.param('campaingid'))
    const  res = this.res
    const  req = this.req
    result  = await Campaing.find({'numcamp':camapingid}).limit(1) 
 
    if (typeof result === 'undefined' || result.length ==0 )
        return this.res.json({mssg:'Error, not exist opinion in campaing ' + String(camapingid)});
    else {
      allReviews = await Review.find({campaing:camapingid}).populate("citizen").populate("source")
      return this.res.json({mssg:'OK', reviews:allReviews});
    }
    //return exits.success({result: "!!!Sucessful"});

  }
}
