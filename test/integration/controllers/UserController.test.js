/* eslint-disable no-undef */
var supertest = require('supertest');

///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
/*
describe('UserController.login', function () {
  describe('#login', function () {
    it('should be sucessful', function (done) {

      supertest(sails.hooks.http.app)
        .post('/user/singIn')
        .field( 'email', 'admin@example.com')
        .field( 'password','12345678' )
        .expect(200, (err) => {
          if (err) { return done(err); }
          done();
        });
    });

  });
})

describe('UserController.singUp', function () {
  describe('#singUp', function () {
    it('should be sucessful', function (done) {
      //.send({ name: 'TESTname', phone: '52105030', email: 'Test@example.com', password: '12345678' })
      //.set('Accept', 'application/json')
      supertest(sails.hooks.http.app)
        .post('/user/singUp')
        .field('name','TESTname')
        .field('phone','52105030')
        .field('email','Test@example.com')
        .field('password','12345678')
        .expect(200, (err) => {
          if (err) { return done(err); }
          done();
        });
    });

  });
})
*/
