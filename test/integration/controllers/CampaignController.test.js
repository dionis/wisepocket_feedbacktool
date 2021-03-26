var supertest = require('supertest');
var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
//// SOLO SE REQUIERE SERVICIO DE MOSTRAR CAMPAÑAS POR USUARIO ACTIVO

describe('CampaignController.getCampaignbyUser', function () {
    describe('#getCampaignbyUser', function () {
        it('should redirect to /my/page', function (done) {
            supertest(sails.hooks.http.app)
                .get('/campaign/getCampaignbyUser/_id')
                .query()
                .send({ page: 0, id: '605e4a4cd974b333bcbc8b4c' })
                .expect(200, (err, res) => {
                    if (err) { return done(err); }
                    done();
                });

        });
    })
});


