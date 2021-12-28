var supertest = require('supertest');



describe('EstadisticaByTipoController.getCPostivaXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('total de opiniones positivas por dia de una Campaña', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByTipo/getCPostivaXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>> total de opiniones positivas por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })
});

describe('EstadisticaByTipoController.getCNegativaXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('total de opiniones negativas por dia de una Campaña', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByTipo/getCNegativaXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>> total de opiniones negativas por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })
});

describe('EstadisticaByTipoController.getCNeutraXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('total de opiniones neutras por dia de una Campaña', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByTipo/getCNeutraXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>> total de opiniones neutras por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })

  
});

describe('EstadisticaByTipoController.getCantTotalXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('total de opiniones por dia de una Campaña', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // User.find().then(userResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/estadisticaByTipo/getCantTotalXDia').query({ id: campaign.id })
          .expect(200)
          .then(response => {
            ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
            // assert(response.body.email, 'foo@bar.com')
            console.log("Service OK:" + response.text)
            /// response.text >>>>> total de opiniones por dia de una Campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })
    });
  })

  
});