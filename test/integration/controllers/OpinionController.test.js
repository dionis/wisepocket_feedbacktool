var supertest = require('supertest');
//var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE


describe('OpinionController.getOpinion', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('#getOpinion', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // Campaign.find().then(campResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/opinion/getOpinion').query({ page: 0, id: campaign.id })
          .expect(200)
          .then(response => {
            console.log("Service OK:" + response.text)
             /// response.text >>>>> Lista de Opiniones del usuario en la campaña correspondiente
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })



    });
  })
});

describe('OpinionController.getOpinionXIdiomaCamp', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe('#getOpinionXIdiomaCamp', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        // Campaign.find().then(campResult => {
        ///https://www.npmjs.com/package/supertest
        console.log("FIND Campaign BY NAME ", campaign.nombre);
        supertest(sails.hooks.http.app)
          .get('/opinion/getOpinionXIdiomaCamp').query({ page: 0, id: campaign.id, idioma: 'ingles'})
          .expect(200)
          .then(response => {
            console.log("Service OK:" + response.text)
             /// response.text >>>>> Lista de Opiniones por idioma en una campaña
            done();
          })
          .catch(err => done(err))


      }).catch(error => {
        throw Error(error)
      })



    });
  })
});

//DELETE TODAS LAS OPINIONES
/*describe('OpinionController.deleteAllOpinion', function () {
    before(function() {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });

    after(function() {
      // runs once after the last test in this block
    });
    describe('#deleteAllOpinion', function () {
        it('should redirect to /my/page',  function (done) {
            supertest(sails.hooks.http.app)
            .get('/opinion/deleteAllOpinion')
            .expect(200)
            .then(response => {
               ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
               // assert(response.body.email, 'foo@bar.com')
                console.log("Service OK:" + response.text)
                done();
            })
            .catch(err => done(err))


        }).catch(error =>{
              throw Error(error)
        })



        });
    })*/

