var supertest = require('supertest');
var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
//// SOLO SE REQUIERE SERVICIO DE MOSTRAR CAMPAÑAS POR USUARIO ACTIVO

describe('CampaignController.getCampaignbyUser', function () {
    before(function() {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });

    after(function() {
      // runs once after the last test in this block
    });
    describe('#getCampaignbyUser', function () {
        it('should redirect to /my/page',  function (done) {
           User.find().then(zookeepers=>{
            let user = zookeepers[0];
            console.log("---- New Test execution data ----",  zookeepers[0].id)
          // User.find().then(userResult => {
  ///https://www.npmjs.com/package/supertest
            console.log("FIND USER BY NAME " ,user.id);
            supertest(sails.hooks.http.app)
            .get('/campaign/getCampaignbyUser/_id')
            .query({ page: 1, id: user.id })
            .expect(200)
            .then(response => {
               ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
               // assert(response.body.email, 'foo@bar.com')
                console.log("Test executed")
                done();
            })
            .catch(err => done(err))


        }).catch(error =>{
              throw Error(error)
        })



        });
    })
});

///  MUSALA TEST EXAMPLE


// it('Should redirect to /gateway/add-gateway',  function (done) {
  // Gateway.count({}).then(
  //     beforeTest => {
  //        newGateway= {
  //           serial:faker.random.uuid(),
  //           gatewayName:faker.commerce.productName(),
  //           iPv4Address:faker.internet.ip()
  //        }
  //        //Request paramenters
  //        req = {
  //           gateway:  newGateway
  //        }

  //        supertest(sails.hooks.http.app)
  //        .put('/gateway/add-gateway')
  //        .send(req)
  //        .expect(200,  function (err, res) {
  //              if (err) return done(err);
  //              assert.equal("OK",res.body.mssg)

  //              Gateway.count({}).then(afterTest=>{
  //              assert.equal(true, beforeTest < afterTest )
  //                 done()
  //              }).catch(error=>{
  //                 throw Error(error)
  //              })
  //        });
  //     }
  //  ).catch(error =>{
  //     throw Error(error)
  //  })
//  });
