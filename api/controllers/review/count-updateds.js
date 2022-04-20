module.exports = {


  friendlyName: 'Count updateds',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.

    listAccess = await AccCounter.find({})
    
    if (typeof listAccess  === 'undefined'){
      return this.res.json({mssg:'Not exist updateds '});
    }
    else {
       counterAcces = 0
       for ( const iAcces of listAccess){
        counterAcces += iAcces.acccounter
       }
      return  this.res.json({mssg:'OK', acces_value:counterAcces});

    }  

  }


};
