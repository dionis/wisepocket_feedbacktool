var faker = require('faker');
faker.locale = "es"
module.exports = {


  friendlyName: 'Seed wise pocket',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits)  {

    // (1)  To call this helper:

    // // With default usage:
    // await sails.helpers.seedWisePocket(…, …);

    // // With named parameters:
    // await sails.helpers.seedWisePocket.with({
    //   someInput: …,
    //   someOtherInput: …
    // });
    // TODO

    await AdminLogin.createEach([
      { username: "admin",
      password:"nimda",
      email:"wisepocket@uo.edu.cu",
      isActivated:true, },
    ]);
  
    //Create a Campaing
    var generateNameCampaing = faker.commerce.productName()
    newCampaing = await Campaing.create({
         name:generateNameCampaing,
         numcamp:"0",
         description:faker.lorem.paragraph()
    })

    var newCampaing = await Campaing.findOne({name:generateNameCampaing})

    ///Configuration Update

    Configuration.find({key:"smtp"}).limit(1).exec( async function userConfiguration(err, configurationObject) {
      if (!configurationObject || err || configurationObject == "") {
       // console.log("Create configuration Object ")
        await Configuration.create({key:"smtp", value:JSON.stringify(sails.config.globals.configsystem)})
      }
    })
   

    // var generateName = faker.name.firstName()
    // //Create 100 reviews and in a same time 100 sources
    // var registerSize = 100;
    // citizenReview = {
    //   name:generateName,
    //   lastname:faker.name.lastName(),
    //   systempassword:faker.lorem.words(),
    //   phonenumber:faker.phone.phoneNumber(),
    //   movilphonenumber: faker.phone.phoneNumber(),
    //   email:faker.internet.email(),
    //   loginkey:faker.lorem.word(),
    //   address:faker.address.streetAddress()   
    // }
    
    // await Citizen.create(citizenReview) 
    // useInDataBase = await Citizen.findOne({ name:generateName})
   
    // arraySources = ['internet', 'sms','email','whatshapp','telegram','messenger']
   
    // var faqArray = []
    // var sourceArray = []
    // for ( var iValue = 1 ; iValue <  registerSize; iValue++) {

    //   reviewSource = faker.random.arrayElement(arraySources)
    //   newSource = {type:reviewSource}
    //   if (reviewSource == 'email'){
    //     newSource.email = faker.internet.email()
    //   } else if (reviewSource =='sms'|| reviewSource=='whatshapp'||
    //                reviewSource=='telegram'|| reviewSource=='messenger'){
    //     newSource.phonenumber = faker.phone.phoneNumber()
                    
    //   }

    //   sourceArray.push(newSource)
    //   faqArray.push( {
    //     type:"opinion" ,
    //     status:"view",
    //     subject:faker.lorem.sentence(),
    //     data: faker.lorem.paragraph(),
    //     date:faker.date.recent(),
    //     citizen:useInDataBase.id,
    //     campaing:newCampaing.id,
    //     datelong:faker.date.past() 
    //   })

    //   if (iValue % 15 == 0){
    //     await Review.createEach(faqArray);
    //     await Source.createEach(sourceArray);
    //     faqArray = []
    //     sourceArray = []
    //     generateName = faker.name.firstName()
    //     citizenReview = {
    //       name:generateName,
    //       lastname:faker.name.lastName(),
    //       systempassword:faker.lorem.words(),
    //       phonenumber:faker.phone.phoneNumber(),
    //       movilphonenumber: faker.phone.phoneNumber(),
    //       email:faker.internet.email(),
    //       loginkey:faker.lorem.word(),
    //       address:faker.address.streetAddress()
    //     }    
    //     await Citizen.create(citizenReview)
    //     useInDataBase = await Citizen.find({ name:generateName}).limit(1)
    //   }
    // }
   

    // allReview = await Review.find({})
    // allSources = await Source.find({})

    // for (var iReview = 1; iReview < allReview.length; iReview++){
    //     await Source.addToCollection(allSources[iReview].id, 'reviews', allReview[iReview].id);
    // }
    return exits.success("OK");
  },

};

