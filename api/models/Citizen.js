/**
 * Citizen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    id:{
      type:'string',
      columnName: '_id',
      unique: true    
    },
    name:{
      type: 'string',
      defaultsTo:""
    },
    lastname:{
      type: 'string',
      defaultsTo:""
    },
    nameidentifier:{
      type: 'string',
      defaultsTo:""
    },
    phonenumber:{
      type: 'string',
      defaultsTo:""
    },
    movilphonenumber:{
      type: 'string',
      defaultsTo:""
    },
    email:{
      type: 'string',
      defaultsTo:""
    },
    address:{
      type: 'string',
      defaultsTo:""
    },
    processSmsReview:{
      type:'boolean',
      defaultsTo:false
    },
    reviews:{
      collection: 'Review',
      via: 'citizen'
    },
    // Add a reference to Pet
    sources: {
      collection: 'Source',
      via: 'citizens'
    }
  }
};

