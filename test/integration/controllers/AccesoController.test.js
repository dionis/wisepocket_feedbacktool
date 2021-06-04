var supertest = require("supertest");


describe("AccesoController.darAcceso", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Dar acceso a una campaña", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);

          Campaign.find()
            .then((zookeepers) => {
              let camp = zookeepers[0];
              console.log(
                "---- New Test execution data ----",
                zookeepers[0].id
              );
              console.log("FIND Campaign BY NAME ", camp.nombre);
              supertest(sails.hooks.http.app)
                .post("/acceso/darAcceso")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((error) => {
              throw Error(error);
            });
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});

describe("AccesoController.quitarAcceso", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Quitar acceso a una campaña", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);

          Campaign.find()
            .then((zookeepers) => {
              let camp = zookeepers[0];
              console.log(
                "---- New Test execution data ----",
                zookeepers[0].id
              );
              console.log("FIND Campaign BY NAME ", camp.nombre);
              supertest(sails.hooks.http.app)
                .patch("/acceso/quitarAcceso")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((error) => {
              throw Error(error);
            });
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});

describe("AccesoController.devolverAcceso", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Devolver acceso a una campaña", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);

          Campaign.find()
            .then((zookeepers) => {
              let camp = zookeepers[0];
              console.log(
                "---- New Test execution data ----",
                zookeepers[0].id
              );
              console.log("FIND Campaign BY NAME ", camp.nombre);
              supertest(sails.hooks.http.app)
                .patch("/acceso/devolverAcceso")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((error) => {
              throw Error(error);
            });
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});

describe("AccesoController.getStatusAcceso", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Estado de acceso a la Campaña", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);

          Campaign.find()
            .then((zookeepers) => {
              let camp = zookeepers[0];
              console.log(
                "---- New Test execution data ----",
                zookeepers[0].id
              );
              console.log("FIND Campaign BY NAME ", camp.nombre);
              supertest(sails.hooks.http.app)
                .get("/acceso/getStatusAcceso")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((error) => {
              throw Error(error);
            });
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});

describe("AccesoController.deleteAcces", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Elimina el acceso si el invitado es eliminado", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);

          Campaign.find()
            .then((zookeepers) => {
              let camp = zookeepers[0];
              console.log(
                "---- New Test execution data ----",
                zookeepers[0].id
              );
              console.log("FIND Campaign BY NAME ", camp.nombre);
              supertest(sails.hooks.http.app)
                .delete("/acceso/deleteAcces")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((error) => {
              throw Error(error);
            });
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});