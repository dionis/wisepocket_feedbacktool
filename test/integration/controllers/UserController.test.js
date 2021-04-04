
var supertest = require('supertest');
var assert = require('assert');

///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE

describe('UserController.login', function () {
  describe('#login', function () {
    it('should be sucessful', function (done) {

      supertest(sails.hooks.http.app)
        .post('/user/singIn')
        .query()
        .send({ email: 'admin@example.com', password: '12345678' })
        .expect(200, (err, res) => {
          if (err) { return done(err); }
          done();
        });
    });

  });
})

describe('UserController.singUp', function () {
  describe('#singUp', function () {
    it('should be sucessful', function (done) {

      supertest(sails.hooks.http.app)
        .post('/user/singUp')
        .query()
        .send({ name: 'TESTname', phone: 52105030, email: 'Test@example.com', password: '12345678' })
        .expect(200, (err, res) => {
          if (err) { return done(err); }
          done();
        });
    });

  });
})
