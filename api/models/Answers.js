/**
 * Answers.js
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
      isIn: ['opinion', 'congratulation'],
      defaultsTo:'opinion'
    },
    status:{
      type: 'string',
      isIn: ['view', 'response','new'],
      defaultsTo:'new'
    },
    subject:{
      type: 'string',
      defaultsTo:""
    },
    data:{
      type: 'string',
      defaultsTo:""
    },
    date:{
      type:'string'
    },
    // Add a reference to User
    review: {
      model: 'Review'
    }
  }
};

