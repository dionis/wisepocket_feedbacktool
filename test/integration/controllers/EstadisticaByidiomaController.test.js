var supertest = require('supertest');
var faker = require('faker');
var moment = require('moment'); // require
var assert = require('assert');
///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
describe('EstadisticaByidiomaController.getCantENXDia', function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });


  describe('#getCantENXDia', function () {
    it('should redirect to /my/page', function (done) {
      Campaign.find().then(zookeepers => {
        let campaign = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id)
        User.find().then(userResult => {
          ///https://www.npmjs.com/package/supertest
          console.log("FIND Campaign BY NAME ", campaign.nombre);
          supertest(sails.hooks.http.app)
            .get('/estadisticaByidioma/getCantENXDia').query({ id: campaign.id })
            .expect(200)
            .then(response => {
              ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
              // assert(response.body.email, 'foo@bar.com')
              console.log("Service OK:" + response.text)
              /// response.text >>>>> total de opiniones en ingles por dia de una Campaña
              done();
            })
            .catch(err => done(err))


        }).catch(error => {
          throw Error(error)
        })
      });

      /* it('Test new Stadistic by Idiom ', function (done) {
         Campaign.find().then(zookeepers => {
           let campaign = zookeepers[0];
           console.log("<<<---- New Test execution data ---->>> ", zookeepers[0].id)
           // User.find().then(userResult => {
           ///https://www.npmjs.com/package/supertest
           console.log("FIND Campaign BY NAME ", campaign.nombre);
           let data = new Date().toDateString();
           console.log("Data to show ", data);
           let dateWithMomentParser =  moment().format('YYYY-MM-DD');
           console.log("Date parser ===> " + dateWithMomentParser);
   
           Opinion.find({ campaign:zookeepers[0].id}).then(opinions => {
             console.log(" Find opinions to obtain posible dates");
             let opionObject =   faker.random.arrayElement(opinions);
             let dateToFind = opionObject.fecha;
             dateToFind =  moment(dateToFind).format('YYYY-MM-DD');
             console.log(" Date to find " , dateToFind);
   
             ///Insert Opinion in Campaing for each id
   
           //  await createOpinioDateFake( zookeepers[0].id,dateToFind) {
           //     let cantDay = [1, 2, 3, 4, 5, 6, 7];
           //       cantDay.forEach( item =>{
           //           console.log("Numbers of day ", item)
           //           var initialDate = dateInMoment.clone();
           //           let dayForSearch = initialDate.subtract(item, 'days').format("YYYY-MM-DD");
           //           //console.log(" Substrac " ,dateInMoment.format("DD-MM-YYYY") , " - " , item )
           //           console.log("Insert date to search: ==> ", dayForSearch);
           //           dayInTheWeek.push(dayForSearch);
           //       })
   
           //       ///For each day 55 opinion in english and spanish
           //   }
   
             supertest(sails.hooks.http.app)
             .get('/estadisticaByidioma/getCantENXDiaEx').query({ id: campaign.id, client_timestamp:dateToFind })
             .expect(200)
             .then(response => {
               ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
               // assert(response.body.email, 'foo@bar.com')
               console.log("Service OK:" + response.text)
               /// response.text >>>>> total de opiniones en ingles por dia de una Campaña
               done();
             })
             .catch(err => done(err))
   
   
           })
           .catch(error=>{
   
           });
   
   
   
         }).catch(error => {
           throw Error(error)
         })
       });*/

      it('Test new Stadistic by Idiom and Hour Interval ', function (done) {
        Campaign.find().then(zookeepers => {
          let campaign = zookeepers[0];
          console.log("<<<---- New Test execution data ---->>> ", zookeepers[0].id)
          // User.find().then(userResult => {
          ///https://www.npmjs.com/package/supertest
          console.log("<<<--- FIND Campaign BY NAME --->>>", campaign.nombre);
          let data = new Date().toDateString();
          console.log("Data to show ", data);
          let dateWithMomentParser = moment().format('YYYY-MM-DD');
          console.log("Date parser ===> " + dateWithMomentParser);

          Opinion.find({ campaign: zookeepers[0].id }).then(opinions => {
            console.log(" Find opinions to obtain posible dates");
            let opionObject = faker.random.arrayElement(opinions);
            let dateToFind = opionObject.fecha;
            dateToFind = moment(dateToFind).format('YYYY-MM-DD HH:mm a');
            console.log(" Date to find ", dateToFind);

            ///Insert Opinion in Campaing for each id

            //  await createOpinioDateFake( zookeepers[0].id,dateToFind) {
            //     let cantDay = [1, 2, 3, 4, 5, 6, 7];
            //       cantDay.forEach( item =>{
            //           console.log("Numbers of day ", item)
            //           var initialDate = dateInMoment.clone();
            //           let dayForSearch = initialDate.subtract(item, 'days').format("YYYY-MM-DD");
            //           //console.log(" Substrac " ,dateInMoment.format("DD-MM-YYYY") , " - " , item )
            //           console.log("Insert date to search: ==> ", dayForSearch);
            //           dayInTheWeek.push(dayForSearch);
            //       })

            //       ///For each day 55 opinion in english and spanish
            //   }

            supertest(sails.hooks.http.app)
              .get('/estadisticaByidioma/getIntervalInADay').query({ id: campaign.id, client_timestamp: dateToFind })
              .expect(200)
              .then(response => {
                ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
                // assert(response.body.email, 'foo@bar.com')
                console.log("Service OK ==> " + response.text)
                console.log("Service OK ==> " + response.body.data)
                assert.equal(response.body.data.length, 2)
                /// response.text >>>>> total de opiniones en ingles por dia de una Campaña
                done();
              })
              .catch(err => done(err))


          })
            .catch(error => {

            });



        }).catch(error => {
          throw Error(error)
        })
      });
    })
  });

  describe('EstadisticaByidiomaController.getCantESXDia', function () {
    before(function () {
      // runs once before the first test in this block
      //https://mochajs.org/#hooks
    });

    after(function () {
      // runs once after the last test in this block
    });
    describe('#getCantESXDia', function () {
      it('should redirect to /my/page', function (done) {
        Campaign.find().then(zookeepers => {
          let campaign = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id)
          User.find().then(userResult => {
            ///https://www.npmjs.com/package/supertest
            console.log("FIND Campaign BY NAME ", campaign.nombre);
            supertest(sails.hooks.http.app)
              .get('/estadisticaByidioma/getCantESXDia').query({ id: campaign.id })
              .expect(200)
              .then(response => {
                ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
                // assert(response.body.email, 'foo@bar.com')
                console.log("Service OK:" + response.text)
                /// response.text >>>>>  total de opiniones en español por dia de una Campaña
                done();
              })
              .catch(err => done(err))


          }).catch(error => {
            throw Error(error)
          })
        });
      })
    });

    describe('EstadisticaByidiomaController.getCantTotalXDia', function () {
      before(function () {
        // runs once before the first test in this block
        //https://mochajs.org/#hooks
      });

      after(function () {
        // runs once after the last test in this block
      });
      describe('#getCantTotalXDia', function () {
        it('should redirect to /my/page', function (done) {
          Campaign.find().then(zookeepers => {
            let campaign = zookeepers[0];
            console.log("---- New Test execution data ----", zookeepers[0].id)
            // User.find().then(userResult => {
            ///https://www.npmjs.com/package/supertest
            console.log("FIND Campaign BY NAME ", campaign.nombre);
            supertest(sails.hooks.http.app)
              .get('/estadisticaByidioma/getCantTotalXDia').query({ id: campaign.id })
              .expect(200)
              .then(response => {
                ///EJEMPLO DE COMO VALIDAR LA RESPUESTA DEL SERVICIO
                // assert(response.body.email, 'foo@bar.com')
                console.log("Service OK:" + response.text)
                /// response.text >>>>>  total de opiniones por dia de una Campaña
                done();
              })
              .catch(err => done(err))
          }).catch(error => {
            throw Error(error)
          })
        });
      })
    })
  })
})