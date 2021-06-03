var supertest = require("supertest");

///// SE INYECTA EN LA BASE DE DATOS AUTOMATICAMENTE
describe("UserInvitadoController.addCampaigns", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Se asocia el invitado a una Campaña", function () {
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
                .post("/userInvitado/addCampaigns")
                .query({ campID: camp.id, id: userInv.id })
                .expect(200)
                .then((response) => {
                  console.log("Service OK:" + response.text);
                  /// response.text >>>>> Se añaden las campañas a las que es invitado el usuario para colaborar
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

//>>>>>>>>>>>>>>>FUNCIONA PERO AL SER MUCHOS ELEMENTOS NO SE EJECUTA
/*describe('UserInvitadoController.getUsers', function () {
    before(function () {
        // runs once before the first test in this block
        //https://mochajs.org/#hooks
    });

    after(function () {
        // runs once after the last test in this block
    });
    describe('#getUsers', function () {
        it('should redirect to /my/page', function (done) {
            supertest(sails.hooks.http.app)
                .get('/userInvitado/getInvitados')
                .expect(200)
                .then(response => {
                    console.log("Service OK:" + response.text)
                    /// response.text >>>>> Todos los invitados
                    done();
                }).catch(err => done(err))
        })
    });
});*/

describe("UserInvitadoController.getCampXInvitado", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Campañas asociadas a un invitado o en que campañas esta el invitado colaborando", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find().then((zookeepers) => {
        let userInv = zookeepers[0];
        console.log("---- New Test execution data ----", zookeepers[0].id);
        console.log("FIND Invitado BY NAME ", userInv.nombre);
        supertest(sails.hooks.http.app)
          .get("/userInvitado/getCampXInvitado")
          .query({ id: userInv.id })
          .expect(200)
          .then((response) => {
            console.log("Service OK:" + response.text);
            /// response.text >>>>> Campañas asociadas a un invitado o en que campañas esta el invitado colaborando
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});

describe("UserInvitadoController.getInvXUserChief", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Lista de invitados por Administrador o a quienes invito el admin", function () {
    it("should redirect to /my/page", function (done) {
      User.find()
        .then((zookeepers) => {
          let user = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);
          // User.find().then(userResult => {
          ///https://www.npmjs.com/package/supertest
          console.log("FIND USER BY NAME ", user.name);
          supertest(sails.hooks.http.app)
            .get("/userInvitado/getInvXUserChief")
            .query({ id: user.id })
            .expect(200)
            .then((response) => {
              console.log("Service OK:" + response.text);
              /// response.text >>>>> Lista de invitados por Administrador o a quienes invito el admin
              done();
            })
            .catch((err) => done(err));
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});


describe("UserInvitadoController.updatePass", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Asignar una Contraseña al usuario", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);
          console.log("FIND Invitado BY NAME ", userInv.nombre);
          supertest(sails.hooks.http.app)
            .patch("/userInvitado/updatePass")
            .query({ id: userInv.id, password: "12345678" })
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
    });
  });
});

describe("UserInvitadoController.updateInfo", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Actualiza los datos de un invitado", function () {
    it("should redirect to /my/page", function (done) {
      UserInvitado.find()
        .then((zookeepers) => {
          let userInv = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);
          console.log("FIND Invitado BY NAME ", userInv.nombre);
          supertest(sails.hooks.http.app)
            .patch("/userInvitado/updateInfo")
            .query({
              id: userInv.id,
              nombre: "TEST-NAME",
              correo: "test@nauta.cu",
            })
            .expect(200)
            .then((response) => {
              console.log("Service OK:" + response.text);
              /// response.text >>>>> Actualiza los datos de un invitado
              done();
            })
            .catch((err) => done(err));
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});


describe("CampaignController.getInvitadoXCamp", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Lista de Invitados de una Campaña", function () {
    it("should redirect to /my/page", function (done) {
      Campaign.find()
        .then((zookeepers) => {
          let camp = zookeepers[0];
          console.log("---- New Test execution data ----", zookeepers[0].id);
          console.log("FIND Campaign BY NAME ", camp.nombre);
          supertest(sails.hooks.http.app)
            .get("/campaign/getInvitadoXCamp")
            .query({ id: camp.id })
            .expect(200)
            .then((response) => {
              console.log("Service OK:" + response.text);
              /// response.text >>>>> Lista de Invitados de una Campaña
              done();
            })
            .catch((err) => done(err));
        })
        .catch((error) => {
          throw Error(error);
        });
    });
  });
});

describe("UserInvitadoController.deleteAsociar", function () {
  before(function () {
    // runs once before the first test in this block
    //https://mochajs.org/#hooks
  });

  after(function () {
    // runs once after the last test in this block
  });
  describe("Elimina la relacion entre la campaña y el invitado si este ya no existe", function () {
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
                .delete("/userInvitado/deleteAsociar")
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
