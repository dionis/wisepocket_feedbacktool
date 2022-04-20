/**
 * AdminLogin.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id:{
      type:'string',
      columnName: '_id',
      unique: true,
      autoIncrement: false
    },
    username: {
      type: 'string',
      required:true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true
    },

    isActivated: {
      type: 'boolean',
      defaultsTo: true
    }

  }
};

