var MailListener =  require("mail-listener-fixed");
//require("mail-listener2");

var mailListener = null

module.exports = {


  friendlyName: 'Initialize mail reader',


  description: '',


  inputs: {
    // configdata:{
    //      type:'json',
    //      requiered:true,
    //      description:'Mail configuration data'
    // }

  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotConfigurationInfo:{
      description: 'No exist mail configuration information.',
    }

  },

//   Successfully generated:
//   •- api/helpers/initialize-mail-reader.js
 
//  A few reminders:
//   (1)  To call this helper:
 
//            // With default usage:
//            await sails.helpers.initializeMailReader(…, …);
 
//            // With named parameters:
//            await sails.helpers.initializeMailReader.with({
//              someInput: …,
//              someOtherInput: …
//            });
 
//   (2)  You can read more about helpers in the Sails documentation.
//          [?] https://sailsjs.com/docs/concepts/helpers

  fn: async function (inputs,exits) {
    // TODO
    configuration = sails.config.globals.configsystem
    //console.log("<------>")
    if (typeof configuration === 'undefined')
       return exits.NotConfigurationInfo()
    
    //console.log("<------  START --------> :" + JSON.stringify(configuration))
    
       var emailconfig = {
        name: "mail",
        type: "smtp"
      }
  
      if (typeof configuration != "undefined") {
  
        if (typeof configuration.emailsystemadress != "undefined") {
          emailconfig.emailsystemadress = configuration.emailsystemadress
        }
        else {
          emailconfig.emailsystemadress = "enlineacontigo@localhost.com"
  
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
  
  
      mailListener = new MailListener({
        username: emailconfig.emailuser,
        password: emailconfig.emailpassword,
        host: emailconfig.emailhost,
        port:  emailconfig.emailport, // imap port
        tls: emailconfig.emailsecure ,
        connTimeout: 100000, // Default by node-imap
        authTimeout: 50000, // Default by node-imap,
        //debug: console.log, // Or your custom function with only one incoming argument. Default: null
        tlsOptions: {rejectUnauthorized: false},
        mailbox: "INBOX", // mailbox to monitor
        //searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
        markSeen: true, // all fetched email willbe marked as seen and not fetched next time
        fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
        //mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
        attachments: true, // download attachments as they are encountered to the project directory
        attachmentOptions: {directory: "attachments/"} // specify a download directory for attachments
      });
  
  
      ////Useful without ssl configuration YEEEEAAAAAA !!!!!
  
      // mailListener = new MailListener({
      //   username: emailconfig.emailuser,
      //   password: emailconfig.emailpassword,
      //   host: emailconfig.emailhost,
      //   port:  emailconfig.emailport, // imap port
      //   connTimeout: 100000, // Default by node-imap
      //   authTimeout: 50000, // Default by node-imap,
      //   //debug: console.log, // Or your custom function with only one incoming argument. Default: null
      //   mailbox: "INBOX", // mailbox to monitor
      //   //searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
      //   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
      //   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
      //   //mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
      //   attachments: true, // download attachments as they are encountered to the project directory
      //   attachmentOptions: {directory: "attachments/"} // specify a download directory for attachments
      // });
  

    
      mailListener.start(); // start listening

      Configuration.find({type:"smtp"}).limit(1).exec( async function userConfiguration(err, configurationObject) {
        if (!configurationObject || err || configurationObject == "") {
          //console.log("Create configuration Object ")
          await Configuration.create({key:"smtp", value:JSON.stringify(emailconfig)})
        }
      })
     

      console.log("<<<<--------  Start listen New Emails  ----------->>>>")
  
      mailListener.on("server:connected", function () {
        console.log("ImapConnected");
      });
  
      mailListener.on("server:disconnected", function () {
        console.log("<<<<<<< ImapDisconnected >>>>>>>>>>");

        ///Call reload read update information 
        ///use a cron task

        sails.helpers.initializeMailReader()
        console.log("<<<<<<< Restart Mail Listener >>>>>>>>")
      });
  
      mailListener.on("error", function (err) {
        console.log(err);
      });
  
      //Validate if email is update WisePocket Information 
      //OJOO PROVE mail-listener4
      //https://www.npmjs.com/package/mail-listener4

      mailListener.on("mail", async function (mail, seqno, attributes) {
        // do something with mail object including attachments

          var mailuid = attributes.uid

          console.log("!!!!! New Email Arrived !!!!!!")
    
          var from = mail.from[0].address;
          var to = mail.to[0].address;
          var subject = mail.subject;
          var date = mail.date;
          var receivedDate = mail.receivedDate;

          var mailttext =   mail.text;
          var mailhtml = mail.html;
          console.log("Message from : " + JSON.stringify(from));
          console.log("Message to  : " +  JSON.stringify(to))
          console.log("Topic: " + subject);
          console.log("Date: " + date);
          //console.log("Text: " + mailttext);
          var sourceText = {
            mailtext:mailttext,
            fromemail:from.address,
            datemail:date
          };

          console.log('Attempting to mark msg read/seen');
          //-------------------------------------------------
          //              Delete each processing email
          //------------------------------------------------

          // mailListener.imap.seq.setFlags(seqno, ['\\Deleted', '\\Seen'], function (err) {
          //   if (err) {
          //     console.log('error marking message read/SEEN');
          //     return;
          //   }
      
          //   //console.log('moving ' + (seqno || '?') + ' to ' + toMailbox);
          //   //mailListener.imap.move(mailuid, toMailbox, 
          //   mailListener.imap.expunge ( function (err) {
          //       if (err) {
          //         console.log('error moving message');
          //         return;
          //       }
          //       console.log('moved ' + (seqno || '?'), mail.subject);
          //     });
          // });
           
          Information.find({source:from}).exec(async function (err, InforSource){
            if (err) {
                console.log("Error reading database: " + JSON.stringify(err))
            }
            else {
              if (typeof InforSource !== 'undefined' && InforSource.length > 0){
                ///It is and possible update WisePocket information
                ///Remenber InforSource is an array
                info = InforSource[0]
                console.log("----- Updating database ------")
                await sails.helpers.processMailupdateInfo.with({
                                                          source:from,
                                                          infoObject:info,
                                                          bodymail:mailttext
                                                        })
                  console.log("<<<<< End Process New Email >>>>>>>>")  
              }
              else {
                ///It is and possible email review
                console.log("Processing possible Opinion or Question email")
                result = await sails.helpers.processMailReview.with({
                                                          mailtext:mailttext,
                                                          fromemail:from,
                                                          datemail:date
                                                        }).tolerate('ErrorNotRegularExpresion',()=>{

                                                          console.log("<<<Error>>>")
                                                        })
                console.log("<<<<< End Process Review New Email >>>>>>>>")  
              }
            }
          
          })       

        ///Delete message for avoiding email inbox overfloat

       // mail processing code goes here
      });
  
      mailListener.on("attachment", function (attachment) {
        console.log("######### Info atachment ###########" )
        console.log(attachment.path);
      });
      
      return exits.success()
    
  }


};

