var supertest = require('supertest');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
describe('EstadisticaByidiomaController.getUpdateEstadIdioma', function () {
    before(function () {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });
  
    after(function () {
      // runs once after the last test in this block
    });
    describe('#getUpdateEstadIdioma', function () {
      it('should redirect to /my/page', function (done) {
        Campaign.find().then(zookeepers => {
          let campaign = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id)
          // User.find().then(userResult => {
          ///https://www.npmjs.com/package/supertest
          console.log("FIND Campaign BY NAME ", campaign.nombre);
          supertest(sails.hooks.http.app)
            .get('/estadisticaByidioma/getUpdateEstadIdioma').query({ id: campaign.id })
            .expect(200)
            .then(response => {
              ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
              // assert(response.body.email, 'foo@bar.com')
              console.log("Service OK:" + response.text)
                 /// response.text >>>>> Actualizacion de datos de estadisticas de opiniones por
                 ///                     idioma de una Campaña 
              done();
            })
            .catch(err => done(err))
  
  
        }).catch(error => {
          throw Error(error)
        })
  
  
  
      });
    })
  });

  describe('EstadisticaByidiomaController.getEstadistica', function () {
    before(function () {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });
  
    after(function () {
      // runs once after the last test in this block
    });
    describe('#getEstadistica', function () {
      it('should redirect to /my/page', function (done) {
        Campaign.find().then(zookeepers => {
          let campaign = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id)
          // User.find().then(userResult => {
          ///https://www.npmjs.com/package/supertest
          console.log("FIND Campaign BY NAME ", campaign.nombre);
          supertest(sails.hooks.http.app)
            .get('/estadisticaByidioma/getEstadistica').query({ id: campaign.id })
            .expect(200)
            .then(response => {
              ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
              // assert(response.body.email, 'foo@bar.com')
              console.log("Service OK:" + response.text)
                 /// response.text >>>>>  datos actualizados de estadisticas de opiniones por
                 ///                     idioma de una Campaña 
              done();
            })
            .catch(err => done(err))
  
  
        }).catch(error => {
          throw Error(error)
        })
  
  
  
      });
    })
  });