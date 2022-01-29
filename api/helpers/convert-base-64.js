//const base64 = require('base-64')
module.exports = {


  friendlyName: 'Convert base 64',


  description: 'Transform an image to base 64',


  inputs: {
       file:{
         type: 'string',
         example: '/images.jpg',
         description: 'Path to images',
         required: true
       }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
     // read binary data
     bitmap = await fs.readFile(file)
     return new Buffer(bitmap).toString('base64')
     // convert binary data to base64 encoded string
  }


};

