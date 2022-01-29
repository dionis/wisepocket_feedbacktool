/**
 * Source.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:'string',
      columnName: '_id',
      unique: true     
    },
    type:{
      type: 'string',
      isIn: ['internet', 'sms','email','whatshapp','telegram','messenger'],
      defaultsTo:'internet'
    },
    email: {
      type: 'string',
    },
    phonenumber: {
      type: 'string',
    },
    imei: {
      type: 'string',
    },
    reviews:{
      collection: 'Review',
      via: 'source'
    },
    // Add a reference to User
    citizens: {
      collection: 'Citizen',
      via: 'sources'
    }

  }
};

