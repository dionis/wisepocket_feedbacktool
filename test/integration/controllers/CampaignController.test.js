var supertest = require('supertest');
var faker = require('faker');
var assert = require('assert');

///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
//// SOLO SE REQUIERE SERVICIO DE MOSTRAR CAMPAÑAS POR USUARIO ACTIVO

/*describe('CampaignController.getCampaignbyUser', function () {
    describe('#getCampaignbyUser', function () {
        it('should redirect to /my/page', function (done) {
            Campaign.count({}).then(
                beforeTest => {
                    User.find({}).then(userList => {
                        var user = null
                        while (user == null) {
                            user = faker.random.arrayElement(userList)
                        }
                    })
               
            supertest(sails.hooks.http.app)
                .get('/campaign/getCampaignbyUser/_id')
                .query()
                .send({ page: 0, id: userObjet.id })
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    done();
                });
            });
        });
    })
});*/


