var request = require("request");
var http = require("http");
var https = require("https");

module.exports = {
  friendlyName: 'Nlp sentiment analysis call',

  description: '',

  inputs: {
    textreview: {
      type: 'string',
      required: true,
    },
    aspect: {
      type: 'string',
      required: true,
    },
    opinionid: {
      type: 'string',
      required: true,
    },
    camapaignid: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
    callServiceError:{
      description: 'Error in call NLP Sentimen Analysis Services',
      error: ''
    }
  },

  fn: async function (inputs, exits) {
    ///Call a REST API Since Sails Framework
    ///
    /// Bibliografy
    ///
    /// https://nodejs.dev/learn/making-http-requests-with-nodejs
    ///
    /// https://devdreamz.com/question/970154-call-rest-api-in-sails-js
    ///
    /// https://stackoverflow.com/questions/37958383/call-rest-api-in-sails-js
    ///
    var rs = 'Someone';
    let review = inputs.textreview;
    let opinionid = inputs.opinionid;
    let camapaignid = inputs.camapaignid;
    let aspectInReview = inputs.aspect;
    console.log('**** In Call Configuration Read ****');
    let configuration = sails.config.globals.configsystem;

    console.log('**** In Call ****');

    if (typeof configuration === 'undefined') {
      console.error(' !!!! NOT CONFIFURATION NLP CALL SERVICES ');
      return exits.callServiceError();
    } else if (
      typeof configuration.nlpurlservices === 'undefine' ||
      configuration.nlpurlservices === ''
    ) {
      console.error(' !!!! NOT CONFIFURATION NLP CALL SERVICES ');
      return exits.callServiceError();
    } else {

      let hostnameAddress =  configuration.nlpurlservices;
      let servicename = configuration.nlpservicename;
      let hostnameservicetype =  configuration.nlptypeservices;
      console.log('*******  Nlp sentiment analysis call *******')
      console.log(' Hostname : ' , hostnameAddress);
      console.log( 'Service Name : ', servicename);
      console.log( ' Service type : ', hostnameservicetype );
      console.log(' --------------------------------------');
      console.log(' Review: ' ,  review);
      console.log(' Opinion id',opinionid );
      console.log(' Camapaign id', camapaignid);

      const data = JSON.stringify({
        'id_opinion': opinionid,
        'id_campaign': camapaignid,
        'textopinion': review,
        'aspectopinion':aspectInReview
      });

      var options = {
        hostname: hostnameAddress,
        port: 5000,
        path: servicename,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };



      //JSON.stringify();

      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
          //process.stdout.write(d);
          // console.log('<---- Send data and request === ', d);
          console.log(' !!! Services Call !!!');
          return exits.success();
        });
      });

      req.on('error', error => {
        console.error(error);
        exits.callServiceError.error = error;
        return  exits.callServiceError();
        ///Write error to call services with timestamp in milliseconds
      });

      req.write(data);
      req.end();



    }
  },
};
