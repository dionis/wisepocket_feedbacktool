var supertest = require('supertest');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
describe('EstadisticaByidiomaController.getCantENXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('#getCantENXDia', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByidioma/getCantENXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>> total de opiniones en ingles por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })
});

describe('EstadisticaByidiomaController.getCantESXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('#getCantESXDia', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByidioma/getCantESXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>>  total de opiniones en español por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })
});

describe('EstadisticaByidiomaController.getCantTotalXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('#getCantTotalXDia', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByidioma/getCantTotalXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>>  total de opiniones por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })
});