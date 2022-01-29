var util = require('util');
var assert = require('assert');
var faker = require('faker');
const fs = require('fs');
const xml2js = require('xml2js');
const Regex = require('regex');
var appRoot = require('app-root-path');
var path = require('path');
faker.locale = "es"

const pathToFile = 'test/fixtures/'
const royalSnsElizabeth = "+5352767508=$Elizabeth Astorga$@eastorga@#52767508#*ave de cespedes   *!!()&jdjdjdb&"
const royalSmsElizabeth = "+5352767508=@eastorga@()&a ver si funciona jajaja&"
const mailStringWithoutContact = "(El programa)@Eldato@&Esto que pasa es extrano&";
const mailStringWithoutContactAddress = "$Pepe Lopez$!!(Esto es una prueba)&Esto no es como parece&";
const mailStringWithContactAdd = "$Pepe Lopez$#2344334433#*Calle 5ta y Ave Lutero #4533*!!(Esto es una prueba)&Esto no es como parece&";

describe('send-mail (Helper)', function() {  

  describe('#Send mail Information()', function () {
    it('Ok send mail information ',  async function (done) {
    
      configList =  await  Configuration.find({key:"smtp"}).limit(1)
 
      config = JSON.parse(configList[0].value)

      campainInfo = await Campaing.find({}).limit(1)

        var campaingdata = {
          campaing: campainInfo[0].numcamp
        };


        source = config.emailsystemadress
        if (typeof source === 'undefined')
           source = 'dionis@uo.edu.cu'

        configuration = config
          if (typeof configuration != "undefined") {
            var emailconfig = {
              name: "mail",
              type: "smtp"
            }

            if (typeof configuration.emailsystemadress != "undefined") {
              emailconfig.emailsystemadress = config.emailsystemadress
            }
            else {
              emailconfig.emailsystemadress = "wisepocket@uo.edu.cu"
      
            }
      
      
            if (typeof configuration.emailport != "undefined") {
              emailconfig.emailport = Number(config.emailport);
            }
            else {
              emailconfig.emailport = "25"
      
            }
      
            if (typeof configuration.emailhost != "undefined") {
              emailconfig.emailhost = config.emailhost
            }
            else {
              emailconfig.emailhost = "127.0.0.1"
            }
      
            if (typeof configuration.emailuser != "undefined") {
              emailconfig.emailuser = config.emailuser
            }
      
      
            if (typeof configuration.emailpassword != "undefined") {
              emailconfig.emailpassword = config.emailpassword
            }
      
            if (typeof configuration.emailsecure != "undefined") {
              emailconfig.emailsecure = Boolean( config.emailsecure);
            }
            else {
              emailconfig.emailsecure = false
            }

          }      
  
          ///Send email answer, because update information email don't have correct format
          emailData = {
              to:source,
              subject:config.bademailsubject,
              html:'<h1>' +  config.bademailinfo + '</h1>'
          }

          fileContents = "Prueba de envio"
          emailData.html += "<h4>"+fileContents+"</h4>"
         // console.log("Mail to send ===> " + JSON.stringify(emailData))
        
         await sails.helpers.sendMail.with({
          configuration:emailconfig,
            emailInfo:emailData
            }).intercept('error', ()=>{
              sails.log.error(
                'Background instruction failed:  Could not deliver email:\n'+
                util.inspect(inputs,{depth:null})+'\n',
                'Error details:\n'+
                util.inspect(err)
              )
         
           console.log("---------")   
           assert.equal("Ok", listInformation)
           return done() 
      }).catch(done)  
  }); 
 }); 
});