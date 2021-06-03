/**
 * Opinion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    /* id: {
       type: 'string',
       unique: true,
       columnName: '_id'
     },*/


    texto: {
      type: 'string',
      required: true
    },

    aspectos: {
      collection: 'aspectoopinion',
      via: 'opinion'
    },

    entidades: {
      collection: 'entidadopinion',
      via: 'opinion'
    },

    ///PROVISIONAL
    polaridad: {
      type: 'string'
    },
    ///PROVISIONAL

    fecha: {
      type: 'string', //new Date().toLocaleString('en-US', {weekday:'long'})
      columnType: 'date'
    },

    createDay: {
      type: 'ref', //new Date().toLocaleString('en-US', {weekday:'long'})
      columnType: 'datetime'
    },

    idioma: {
      type: 'string'
    },

    userend: {
      model: 'userend'
    },

    campaign: {
      model: 'campaign'
    },

  },
  customToJSON: function () {
    return _.omit(this, [ 'aspectos', 'entidades', 'createDay', 'campaign', 'createdAt', 'updatedAt'])
  }
};

