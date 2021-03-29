var supertest = require('supertest');
//var faker = require('faker');


///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE


describe('AspectoOpinionController.getAspecto', function () {
    before(function() {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });

    after(function() {
      // runs once after the last test in this block
    });
    describe('#getAspecto', function () {
        it('should redirect to /my/page',  function (done) {
            Opinion.find().then(zookeepers=>{
            let opinion = zookeepers[0];
            console.log("---- New Test execution data ----",  zookeepers[0].id)
          // User.find().then(userResult => {
  ///https://www.npmjs.com/package/supertest
            console.log("FIND Opinion BY ID " ,opinion.id);
            supertest(sails.hooks.http.app)
            .get('/aspectoopinion/getAspecto').query({ id: opinion.id })
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
    })
});