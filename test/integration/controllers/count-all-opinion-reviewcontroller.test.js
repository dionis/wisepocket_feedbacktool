var supertest = require('supertest');
var assert = require('assert');

// describe('ReviewController.count-all-opinion', function() {
//   describe('#count-all-opinion', function() {
//     it('Should redirect to /review/count-all-opinion', function (done) {
//      //Request paramenters
//       req = {
//         page:0,
//         len:20,
//         campaingid:234,
//         initialDate:'2020-02-23 20:34',
//         finalDate:'2020-03-10 06:34'
//       }

//       supertest(sails.hooks.http.app)
//       .get('/review/count-all-opinion')
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
//            assert.equal(true,res.body.reviews > 0 )
//           done()
//        });
//     });

//     it('Should redirect to /review/count-all-opinion with not page paramenter', function (done) {
//       //Request paramenters
//        req = {
//          len:20,
//          campaingid:234,
//          initialDate:'2020-02-23 20:34',
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/count-all-opinion')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });

//      it('Should redirect to /review/count-all-opinion with not len paramenter', function (done) {
//       //Request paramenters
//        req = {
//          page:0,
//          campaingid:234,
//          initialDate:'2020-02-23 20:34',
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/count-all-opinion')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });
//      it('Should redirect to /review/count-all-opinion with not initialDate paramenter', function (done) {
//       //Request paramenters
//        req = {
//          page:0,
//          campaingid:234,
//          finalDate:'2020-03-10 06:34'
//        }
//        supertest(sails.hooks.http.app)
//        .get('/review/count-all-opinion')
//        .query(req)
//        .expect(400, function (err, res) {
//            done()
//         });
//      });
//   });
// });
