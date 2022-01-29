//var MailListener = require("mail-listener2")
var MailerService = require ('sails-service-mailer');
//var mailListener = null

module.exports = {

  friendlyName: 'Start mail reader',


  description: 'Inicialice an input mail reader',


  inputs: {
    configuration:{
      type: 'ref',
      description: 'Object with all config file',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

//   Successfully generated:
//   •- api/helpers/start-mail-reader.js
 
//  A few reminders:
//   (1)  To call this helper:
 
//            // With default usage:
//            await sails.helpers.startMailReader(…, …);
 
//            // With named parameters:
//            await sails.helpers.startMailReader.with({
//              someInput: …,
//              someOtherInput: …
//            });
 
//   (2)  You can read more about helpers in the Sails documentation.
//          [?] https://sailsjs.com/docs/concepts/helpers


  fn: async function (inputs) {
    // TODO
    var configuration = inputs.configuration;


    var emailconfig = {
      name: "mail",
      type: "smtp"
    }

    if (typeof configuration != "undefined") {

      if (typeof configuration.emailsystemadress != "undefined") {
        emailconfig.emailsystemadress = configuration.emailsystemadress
      }
      else {
        emailconfig.emailsystemadress = "wisepocket@localhost.com"

      }


      if (typeof configuration.emailport != "undefined") {
        emailconfig.emailport = Number(configuration.emailport);
      }
      else {
        emailconfig.emailport = "25"

      }

      if (typeof configuration.emailhost != "undefined") {
        emailconfig.emailhost = configuration.emailhost
      }
      else {
        emailconfig.emailhost = "127.0.0.1"
      }

      if (typeof configuration.emailuser != "undefined") {
        emailconfig.emailuser = configuration.emailuser
      }


      if (typeof configuration.emailpassword != "undefined") {
        emailconfig.emailpassword = configuration.emailpassword
      }

      if (typeof configuration.emailsecure != "undefined") {
        emailconfig.emailsecure = Boolean( configuration.emailsecure);
      }
      else {
        emailconfig.emailsecure = false
      }
    }

    //if not exist mail config information set in database

    Configuration.find({key:"smtp"}).limit(1).exec( async function userConfiguration(err, configurationObject) {
        if (!configurationObject || err || configurationObject == "") {
          await Configuration.create({key:"smtp", value:JSON.stringify(emailconfig)})
        }

        emailData = {
            to:"inoid@wysepocket.cu",
            cc:"",
            subject:"Prueba de envio de correo desde platforma",
            text:"Prueba de envio de correo desde platforma",
            html:"<html><body><h1>Prueba de envio de correo desde platforma</h1></body>"
        }
        
        await sails.helpers.sendMail.with({
          configuration:emailconfig,
             emailInfo:emailData
        }).intercept('error', ()=>{
        return new Error('Inconceivably, no active users were found for that timeframe.');
      });      
    }); 
    // mailListener = new MailListener({
    //   username: emailconfig.emailuser,
    //   password: emailconfig.emailpassword,
    //   host: emailconfig.emailhost,
    //   port:  emailconfig.emailport, // imap port
    //   tls: emailconfig.emailsecure ,
    //   connTimeout: 100000, // Default by node-imap
    //   authTimeout: 50000, // Default by node-imap,
    //  // debug: console.log, // Or your custom function with only one incoming argument. Default: null
    //   tlsOptions: {rejectUnauthorized: false},
    //   mailbox: "INBOX", // mailbox to monitor
    //   //searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
    //   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    //   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    //   //mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    //   attachments: true, // download attachments as they are encountered to the project directory
    //   attachmentOptions: {directory: "attachments/"} // specify a download directory for attachments
    // });

    // mailListener.start(); // start listening

    // mailListener.on("server:connected", function () {
    //   console.log("ImapConnected");
    // });

    // mailListener.on("server:disconnected", function () {
    //   console.log("ImapDisconnected");
    // });

    // mailListener.on("error", function (err) {
    //   console.log(err);
    // });

    // mailListener.on("mail", function (mail, seqno, attributes) {
    //   // do something with mail object including attachments
    //   console.log("!!!!! New Email Arrived !!!!!!")

    //   ProcessEmailService.process(mail)
    //   // mail processing code goes here
    // });

    // mailListener.on("attachment", function (attachment) {
    //   console.log(attachment.path);
    // });

    // it's possible to access imap object from node-imap library for performing additional actions. E.x.
    //mailListener.imap.move(:msguids, :mailboxes, function(){})

  }


};

