/**
 * Camping.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true,
      unique: true
    },

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

    colorPrincipal: {
      type: 'number',
      columnName:'colorPrincipal'
    },
    colorSecundario: {
      type: 'number',
      columnName:'colorSecundario'
    },

    contactoEmail: {
      type: 'string',
      required: true
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
    },

    logo: {
      model: 'imagen',
      //unique: true,
    },

    createdby :{
      model: 'user'
    }


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
