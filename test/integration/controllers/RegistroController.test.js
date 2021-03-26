var supertest = require('supertest');

/////Crea un registro de prueba

describe('RegistroController.create', function () {

  describe('#create()', function () {
    it('should redirect to /my/page', function (done) {
      supertest(sails.hooks.http.app)
        .post('/registro/create')
        .query()
        .send({ texto: 'test', evento: 'test', fecha: 'test' })
        .expect(200, function (err, res) {
          console.log('Registro cretaed');
          if (err) return done(err);
          done();
        });

    });

  });
});