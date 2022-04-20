module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    configuration:{
      type: 'ref',
      description: 'Object with all config file',
      required: true
    },
    emailInfo:{
      type: 'ref',
      description: 'Object with emailInfo',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  // A few reminders:
  // (1)  To call this helper:
 
  //          // With default usage:
  //          await sails.helpers.sendMail(…, …);
 
  //          // With named parameters:
  //          await sails.helpers.sendMail.with({
  //            someInput: …,
  //            someOtherInput: …
  //          });
 
  // (2)  You can read more about helpers in the Sails documentation.
  //        [?] https://sailsjs.com/docs/concepts/helpers
  fn: async function (inputs, exits) {
    // TODO
    options = inputs.emailInfo;

    //console.log("Data email ===> " + JSON.stringify(options))
    var toEmail = options.to;
    var ccEmail =  options.cc;  //Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field
    var subjectEmail =   options.subject;
    var textEmail =   options.text;
    var htmlEmail =  options.html;
   
    var MailerService = require ('sails-service-mailer');
 
    if (!toEmail || toEmail == "")
      return exits.error({err:"Not sender data"});
   
    if (!textEmail && textEmail == "" && !htmlEmail && htmlEmail == "")
      return exits.error({err:"Not text data"});

    var ConfigurationObject = "";

    configuration =  await Configuration.find({key:"smtp"} ).limit(1)
    ConfigurationObject = JSON.parse(configuration[0].value);

    if (!configuration  || configuration == "") {
      return exits.error( {response:"ERROR", message:"Not exits smtp servers configuration."});
      
    }
    else {
      if (configuration.length > 1){
        return exits.error( {response:"ERROR", message:"There are many smtp servers configuration."});
      }


        var mailElement = { 
          from: ConfigurationObject.emailuser,
          to: toEmail,
          cc: ccEmail,
          text: textEmail,
          subject:subjectEmail
        };

        ///If exist parament text set
        if ( htmlEmail) {
          mailElement.html = htmlEmail;
          mailElement.text = htmlEmail;
        }
    ///Read in Configuration´s Colecction data about email server configuration
    ///Get in Database email´s confguration data.
   
    

        ///Take first  element in array
        
       

        //console.log("Configuration data <====>  " + JSON.stringify(ConfigurationObject))

        var emailportFormation = ConfigurationObject.emailsmtport
        var emailhostFormation  = ConfigurationObject.emailsmtphost
        var emailuserFormation  = ConfigurationObject.emailuser
        var emailpassFormation  = ConfigurationObject.emailpassword
        var emailsystemFormation  = ConfigurationObject.emailsystemadress
        var mailconfig = {
          from: emailsystemFormation ,
          ignoreTLS: true, // Turns off STARTTLS support if true
          provider: {
            port: (typeof emailportFormation !== 'undefined')?Number(emailportFormation):25, // The port to connect to
            host:emailhostFormation,
            name: "", // Options hostname of the client
            localAddress:  '', // Local interface to bind to for network connections
            connectionTimeout: 20000, // How many ms to wait for the connection to establish
            greetingTimeout: 20000, // How many ms to wait for the greeting after connection
            socketTimeout: 20000, // How many ms of inactivity to allow
            debug: true, // If true, the connection emits all traffic between client and server as `log` events
            authMethods:["PLAIN"],
            tls: {rejectUnauthorized: false},
          }
        };

        //console.log("Pasword and User: ===> " + emailpassFormation + " <-> " +  ConfigurationObject.emailpassword)
        if (emailpassFormation && emailuserFormation && emailuserFormation != "" ) {
           mailconfig.provider.auth = { // Defines authentication data
            user: emailuserFormation, // Username
            pass: emailpassFormation, // Password
          }

          //console.log("Autentication data ===> " + JSON.stringify(mailconfig.provider.auth))
          mailconfig.provider.secure = true; // Defines if the connection should use SSL 
                                      // true for 465, false for other ports

        }
        
        var smtp = MailerService('smtp', mailconfig );
        smtp.send(
          mailElement
        )
          .then( function () {
            //console.log("Mail sended ====== >>>>>> ")
           
          })
          .catch(function (errSend) {

            //console.log("Error ==== > " + JSON.stringify(errSend))
            return exits.error( {
              response:"ERROR",
              error: errSend
            })
          });
          console.log("<<End Process>>")
          return exits.success("OK")
      }   
  }


};

