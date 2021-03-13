/**
 * Campaign.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */



module.exports = {

  attributes: {

    nombre: {
      type: 'string',
      unique: true,
      required: true,
    },

    fecha: {
      type: 'string',
      columnType: 'date'
    },

    /* userChief: {
       model: 'user'
    }

     attributes: {

    descripcion: {
      type: 'string',
      required: true,
      columnName:'descripcion'
    },

    contanctoTelefono: {
      type: 'number',
      required: true,
      columnName:'contanctoTelefono'
    },
    direccionPostal: {
      type: 'string',
      required: true
    },

    contactoTelegram: {
      type: 'string',
      allowNull: true
    },

    contactoWhatsapp: {
      type: 'string',
      allowNull: true
    },

    contactoFacebook: {
      type: 'string',
      allowNull: true
    }*/
  },



};

