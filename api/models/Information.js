/**
 * Information.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id:{
      type:'string',
      columnName: '_id',
      unique: true      
    },
    title:{
      type: 'string',
      example: 'Actualidad de la información sobre COVID-19 en el mundo',
      description: 'The field title will be updated in app.',
    },
    description:{
      type: 'string',
      example: 'Estado actual de la información referente al estado de infección del mundo',
      description: 'More information about field title will be updated in app.',
    },
    source:{
      type: 'string',
      example: 'fres@gmail.com or web-service',
      description: 'More information about source when updating data.',
    },
    uuid:{
      type: 'string',
      example: '3333',
      description: 'Identifier for each campaing topic (Important for app upadating).',
    },
    classifier:{
      type: 'string',
      example: 'Actualidad',
      description: 'Type of information (Global classifier)',
    },
    data:{
      type: 'json',
      columnType: 'array',
      example: 'Estado actual de la información referente al estado de infección del mundo',
      description: 'More information about field title will be updated in app.',
    },
    type:{
      type: 'string',
      example: 'text, map, chart',
      description: 'What kind of information it is.',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

