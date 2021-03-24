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
      //unique: true            //Esto es válido, temporalmente quitado para las BD automaticas
                                // en la práctica las opiniones no se repiten
    }

  },

};

