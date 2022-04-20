var supertest = require('supertest');
var assert = require('assert');

// describe('ReviewController.find-all', function() {
//   describe('#find-all', function() {
//     it('Should redirect to /review/find-all', function (done) {
//      //Request paramenters
//       req = {
//         page:0,
//         len:20,
//         campaingid:234,
//         initialDate:'2020-02-23 20:34',
//         finalDate:'2020-03-10 06:34'
//       }

//       supertest(sails.hooks.http.app)
//       .get('/review/find-all')
//       .query({
//         page:0,
//         len:20,
//         campaingid:234,
//         initialDate:'2020-02-23 20:34',
//         finalDate:'2020-03-10 06:34'
//       })
//       .expect(200, function (err, res) {
//            if (err) return done(err);
//            assert.equal("OK",res.body.mssg)
//            assert.equal(true,res.body.reviews.length > 0 )
//           done()
//        });
//     });

//     it('Should redirect to /review/find-all with not page paramenter', function (done) {
//       //Request paramenters
//        req = {
//          len:20,
//          campaingid:234,
//          initialDate:'2020-02-23 20:34',
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/find-all')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });

//      it('Should redirect to /review/find-all with not len paramenter', function (done) {
//       //Request paramenters
//        req = {
//          page:0,
//          campaingid:234,
//          initialDate:'2020-02-23 20:34',
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/find-all')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });
//      it('Should redirect to /review/find-all with not initialDate paramenter', function (done) {
//       //Request paramenters
//        req = {
//          page:0,
//          campaingid:234,
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/find-all')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });
//   });
// });
