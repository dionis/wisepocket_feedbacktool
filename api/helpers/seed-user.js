
var faker = require('faker');

module.exports = {


  friendlyName: 'Seed user',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  //   A few reminders:
  //  (1)  To call this helper:

  //           // With default usage:
  //           await sails.helpers.seedGatwaySupport(…, …);

  //           // With named parameters:
  //           await sails.helpers.seedGatwaySupport.with({
  //             someInput: …,
  //             someOtherInput: …
  //           });

  fn: async function (inputs, exits) {
    // TODO

    arrayStatus = ['online', 'offline']

    var gateWayArray = []

    var registerSize = 10;

    for (var iValue = 1; iValue < registerSize; iValue++) {

      gateWayArray.push({
        name: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName()),
        phone: faker.phone.phoneFormats(),
        password:faker.internet.password(8, true, "ts", "ts")

      })
    }

    await User.createEach(gateWayArray)

    allGateway = await User.find({})

    registerSize = 20

    for (var iValue = 1; iValue < registerSize; iValue++) {

      userObjet = faker.random.arrayElement(allGateway)

      let campaign = await Campaign.count({ 'userChief': userObjet.id })
      if (campaign < 20) {
        newCamp = {
          nombre: faker.company.companyName("Test"),
          fecha: "21-3-2021",
          userChief: userObjet.id
      }

      await Campaign.create(newCamp)
    }
  }

  return exits.success("OK");
}


};
