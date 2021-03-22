var supertest = require('supertest');
var faker = require('faker');

describe('UserEndController.create', function() {

  describe('#create()', function() {
    it('should redirect to /my/page', function (done) {
      supertest(sails.hooks.http.app)
      .post('/userend/create')
      .send({ name_alias: 'test', email: faker.internet.exampleEmail(faker.name.firstName())})
      .expect(302)
      .expect('location','/my/page', done);
    });
  });

});