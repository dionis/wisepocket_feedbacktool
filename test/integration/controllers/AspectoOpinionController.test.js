/* eslint-disable no-undef */
var supertest = require('supertest');
//var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE

/*
describe('AspectoOpinionController.getAspecto', () => {
  before(() => {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(() => {
    // runs once after the last test in this block
  });
  describe('Lista de aspectos de la opinion correspondiente', () => {
    it('should redirect to /my/page', (done) => {
      Opinion.find().then(zookeepers => {
        let opinion = zookeepers[0];
        console.log('---- New Test execution data ----', zookeepers[0].id);
        ///https://www.npmjs.com/package/supertest
        console.log('FIND Opinion BY ID ', opinion.id);
        supertest(sails.hooks.http.app)
          .get('/aspectoopinion/getAspecto').query({ id: opinion.id })
          .expect(200)
          .then(response => {
            console.log('Service OK:' + response.text);
            /// response.text >>>>> Lista de aspectos de la opinion correspondiente
            done();
          })
          .catch(err => done(err));


      }).catch(error => {
        throw Error(error);
      });



    });
  });
});
*/
