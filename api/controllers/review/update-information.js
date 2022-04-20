const utf8 = require('utf8');
module.exports = {


  friendlyName: 'Update information',


  description: '',


  inputs: {

    campaingid:{
      type:'string',
      description:"Campaing identifier in database",
      example:"34453",
      required: true
    }

  },


  exits: {
    NotExistUpdateTime:{
      description:'Undefined update timestamp'
    }
  },


  fn: async function (inputs) {

    // All done.
    campaingid = inputs.campaingid

    ///Update date

    ///Information
    result = {}
    result.topics = []

    this.res.charset = 'utf-8'

    resultCampaing  = await Campaing.find({'numcamp':campaingid}).limit(1) 

    if (typeof resultCampaing === 'undefined' || resultCampaing.length ==0) {
      return this.res.send({
        status: "Error",
        messg:'Not exist Public Campaing in WisePocket\'s plataform' });
    }
    else {
      listInformation = await Information.find({})
  
      if (typeof listInformation !== 'undefined' && listInformation.length > 0){
          for (const iInfo of listInformation){
            if (iInfo.type !== "geomap") {
              if (typeof iInfo.data !== 'undefined' && iInfo.data !== null ){
                  object = {}
                  //utf8.encode(iInfo.title)
                  object.title = iInfo.title 
                  object.description = iInfo.description
                  object.uuid = iInfo.uuid
                  object.clasificador = iInfo.classifier                
                  object.data =  iInfo.data
                  result.topics.push(object) 
              }
            }
        }
      }
      
  
      result.maps = null
      listGeoInfo = await GeoInformation.find().limit(1)
      if (typeof listGeoInfo !== 'undefined' && listGeoInfo.length > 0){
          geoInfo = listGeoInfo[0]
          geoJsonData = geoInfo.info
          result.maps = geoJsonData
      }
  
      ////Read stadistic information 
  
      ////Put time when information was read 
      listupdateTime = await TimeUpdate.find().limit(1)
  
      if (typeof listupdateTime === 'undefined')
         return exits.NotExistUpdateTime()
       
      result.timestamp = ""  
      if ( typeof listupdateTime !== 'undefined' && listupdateTime.length > 0)
          result.timestamp = listupdateTime[0].time
  
  
      return this.res.send( {info:result});

    }

  }


};
