/**
 * Review.js
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
    type: {
      type: 'string',
      isIn: ['opinion', 'felicitation','request'],
      defaultsTo: 'opinion'
    },
    status: {
      type: 'string',
      isIn: ['view', 'response', 'new'],
      defaultsTo: 'new'
    },
    subject: {
      type: 'string',
      defaultsTo: ''
    },
    citizenid:{
      type: 'string',
      defaultsTo: ''
    },

    data: {
      type: 'string',
      defaultsTo: ''
    },

    images: {
      type: 'json'

    },
    video: {
      type: 'json'

    },
    taperecord: {
      type: 'json'
    },
    date: {
      type: 'string',
      required: true
    },
    datelong: {
      type: 'string',
      required: true
    },
    source: {
      model: 'Source'
    },
    citizen: {
      model: 'Citizen'
    },
    answers: {
      collection: 'Answers',
      via: 'review'
    },
    imagesource:{
      collection: 'Images',
      via: 'review'
    },
    campaign:{
      model:'campaign',

    }
  }
};

