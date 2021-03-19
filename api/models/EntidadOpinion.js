/**
 * EntidadOpinion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    texto: {
      type: 'string',
    },
    start: {
      type: 'integer'
    },
    end: {
      type: 'integer'
    },

    opinion: {
      model: 'opinion',
      unique: true
    }

  },

};

