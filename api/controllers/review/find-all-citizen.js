module.exports = {


  friendlyName: 'Find all citizen',


  description: 'Search and obtain all citizen which sended opinions',


  inputs: {
    page:{
      type:'number',
      description:"Page number for pagination effect",
      example:45,
      required: true
    },
    len:{
      type:'number',
      description:"Number of citizen for each page",
      example:20,
      required: true
    },
    campaingid:{
      type:'number',
      description:"Campaing identifier",
      example:234,
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.

    Review.find({campaingid:inputs.campaingid,
      skip: inputs.page * inputs.len,
      limit: inputs.len}).populate("citizen")
      .sort('date ASC').exec(function (err, result) {
            setCitizend = {} //Must be a Set. In test we need to verify if there is a repeted
                             //citizen in the list
            if (err) {
              return this.res.json({mssg:'Not found citizen: '+ err ,citizen:result}) 
            }
            else {
              reviewLength = result.length   
              for (var iReview; iReviwew < reviewLength; iReview +=1 )
                setCitizend.push(result[iReviwew])
             
              return this.res.json({mssg:'OK',citizen:setCitizend})      
            }
      }) 

  }


};
