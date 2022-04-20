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

    /*userCamp:{
      model: 'user'
    },*/

    userChief: {
      model: 'user'
    },

    descripcion: {
      type: 'string',
      //required: true,
      columnName: 'descripcion'
    },

    contanctoTelefono: {
      type: 'string',
      //required: true,
      columnName: 'contanctoTelefono'
    },
    direccionPostal: {
      type: 'string',
      //required: true
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

    userInvitados:{
      collection: 'userinvitado',
      via:'campaigns'
    }

    /*logo: {
      model: 'imagen',
      //unique: true,
    },*/

  },

  customToJSON: function () {
    return _.omit(this, ['opinion','pregunta', 'createdAt', 'updatedAt']);
  }

};

