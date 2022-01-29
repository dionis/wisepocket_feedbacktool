const fs = require('fs');
const yaml = require('js-yaml');
const utf8 = require('utf8');
const path = require('path');
const fsp = require('fs').promises;
const appRoot = require('app-root-path');



const parseJson = require('parse-json');
module.exports = {


  friendlyName: 'Process mailupdate info',


  description: '',


  inputs: {

    source:{
       type:'string',
       required:true,
       example:"file@gmail.com"
    },
    bodymail:{
      type:'string',
      required:true,
      example:"A YAML string"
    },
    infoObject:{
      type:'json',
      required:true,
      example:"An Object Information datails"

    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    NotDataInfo:{
      description: 'Not exist information to parse',
    }

  },


  fn: async function (inputs, exits) {
    // TODO
    source = inputs.source
    infoWisePocket = inputs.infoObject
    fileContents = inputs.bodymail
    
    try {
      //let fileContents = fs.readFileSync('./FORMATO_MENSAJE_CONSEJO_DEFENSA_MUNICIPAL_YAML.txt', 'utf8');
      //let fileContents = fs.readFileSync('./FORMATO_PERIODISTA_YAML.txt', 'utf8');
     
      if (typeof fileContents !== 'undefined'){

        // const directoryPath = path.join(__dirname, 'Documents');
        //   //passsing directoryPath and callback function
        //   fs.readdir(directoryPath, function (err, files) {
        //       //handling error
        //       if (err) {
        //           return console.log('Unable to scan directory: ' + err);
        //       } 
        //       //listing all files using forEach
        //       files.forEach(function (file) {
        //           // Do whatever you want to do with the file
        //           console.log(file); 
        //       });
        //   });

        if (infoWisePocket.type == "geomap"){

          ///if word map apperar in the text then 
          ///review attachment file an 
          pathToFile = "attachments"
          let files = await fsp.readdir(appRoot + path.sep + pathToFile, {withFileTypes: true});
          
          ///Or attachment directory empty
          if (!fileContents.includes('geodata')|| files.length == 0 ) {
              throw Error("No es un email para actualizar información geográfica")
          }
          else {

           console.log("---Creating GeoInformation---")          
           campainInfo = await Campaing.find({}).limit(1);
           
           var campaingdata = {
            campaingid: campainInfo[0].numcamp
          };
          resultGeo = await sails.helpers.readGeographicInformation.with(campaingdata).intercept('NotValidGeoJsonFile',()=>{
            throw Error("No es un email para actualizar información geográfica")
          })
            
          console.log("---End Creating GeoInformation---") 
       
         }
       }
        else {
          // options = []
          // options.push()
          let data = yaml.safeLoad(fileContents, {schema:yaml.DEFAULT_FULL_SCHEMA})
          var pos = 0
          console.log(data);
          console.log("__________________")
          objectInData = data
          dataArray = []
          for( let prop in objectInData ){
           // console.log(  );
            objInfo = {}             
            // console.log("Key " + prop)
            value = objectInData[prop]
            // if (Array.isArray(value)){
            //    console.log("Is array ")
            // }
            
            objInfo.pos = pos
            objInfo.type = "text"
            var text = "" + prop + " " +  objectInData[prop]           
            objInfo.value = text 

          
            // console.log("Value: " + objectInData[prop])
            // console.log( "<=> " + pos );
            dataArray.push(objInfo)

            pos += 1
          }

          //console.log(JSON.stringify(dataArray)) 
          newtitle =  utf8.encode(infoWisePocket.title);
          await Information.update({title:infoWisePocket.title}).set({ title:newtitle, data:dataArray}) 
        }
         
          //Update timestamp in TimeUpdate
          arrayTimestamp = await TimeUpdate.find({}).limit(1)
          if (typeof arrayTimestamp !== "undefined" ){
            lastimestamp = arrayTimestamp[0].time
            timestamp = Date.now().toString();
            await TimeUpdate.update({time:lastimestamp}).set({time:timestamp})
          }
         console.log("--- End --- ")
         return exits.success()
           
      }
      else return exits.NotDataInfo()
  } catch (e) { //if error send message to source because email isn't in YAML format
      console.log(e);

          configuration = sails.config.globals.configsystem
          if (typeof configuration != "undefined") {
            var emailconfig = {
              name: "mail",
              type: "smtp"
            }

            if (typeof configuration.emailsystemadress != "undefined") {
              emailconfig.emailsystemadress = configuration.emailsystemadress
            }
            else {
              emailconfig.emailsystemadress = "wisepocket@uo.edu.cu"
      
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

            await Configuration.create({key:"smtp", value:JSON.stringify(emailconfig)})
          }      
    
        ///Send email answer, because update information email don't have correct format
        emailData = {
            to:source,
            subject:sails.config.globals.configsystem.bademailsubject,
            html:'<h1>' +  sails.config.globals.configsystem.bademailinfo + '</h1>'
        }

        emailData.html += "<h4>"+fileContents+"</h4>"
        console.log("Mail to send ===> " + JSON.stringify(emailData))
          
        await sails.helpers.sendMail.with({
          configuration:emailconfig,
             emailInfo:emailData
            }).intercept('error', ()=>{
              sails.log.error(
                'Background instruction failed:  Could not deliver email:\n'+
                util.inspect(inputs,{depth:null})+'\n',
                'Error details:\n'+
                util.inspect(err)
              );
        
      return exits.error(e);     
    })
   } 
 }


};

