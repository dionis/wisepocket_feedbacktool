
var faker = require('faker');
const bcrypt = require('bcrypt');

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

    var registerSize = 7;


    for (var iValue = 1; iValue < registerSize; iValue++) {

      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash("12345678", salt)

      gateWayArray.push({
        name: faker.name.firstName(),
        email: faker.internet.exampleEmail(faker.name.firstName()),
        phone: faker.phone.phoneFormats(),
        password: hashpass

      })
    }
    console.log('CONTRASEÑA PARA USUARIOS: 12345678' + ' ' + 'LOGIN VIA INTERFAZ');
    console.log('Coger un EMAIL de cualquier usuario en la BD');
    console.log('');
    await User.createEach(gateWayArray)

    allGateway = await User.find({})

    registerSize = 31

    for (var iValue = 1; iValue < registerSize; iValue++) {

      userObjet = faker.random.arrayElement(allGateway)

      let campaign = await Campaign.count({ 'userChief': userObjet.id })

      if (campaign < 31) {
        newCamp = {
          nombre: faker.company.companyName("Test"),
          fecha: faker.date.recent(7),
          userChief: userObjet.id
        }

        await Campaign.create(newCamp)
      }
    }

    registerSize = 41
    for (var iValue = 1; iValue < registerSize; iValue++) {
      userObjet = faker.random.arrayElement(allGateway)
      let userInv = await UserInvitado.count({ 'invitadoBY': userObjet.id })

      if (userInv < 41) {
        newInv = {
          nombre: faker.name.firstName(),
          correo: faker.internet.exampleEmail(faker.name.firstName()),
          telefono: faker.phone.phoneFormats(),
          direccion: faker.lorem.sentences(3, ''),
          invitadoBY: userObjet.id
        }

        await UserInvitado.create(newInv)
      }
    }

    return exits.success("OK");
  }


};
