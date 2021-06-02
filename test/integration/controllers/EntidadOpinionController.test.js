var supertest = require('supertest');
//var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE


describe('EntidadOpinionController.getEntidad', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('Lista de Entidades de la opinion correspondiente', function () {
    it('should redirect to /my/page', function (done) {
      Opinion.find().then(zookeepers => {
        let opinion = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Opinion BY ID ", opinion.id);
        supertest(sails.hooks.http.app)
          .get('/entidadopinion/getEntidad').query({ id: opinion.id })
          .expect(200)
          .then(response => {
            console.log("Service OK:" + response.text)
             /// response.text >>>>> Lista de Entidades de la opinion correspondiente
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })



    });
  })
});