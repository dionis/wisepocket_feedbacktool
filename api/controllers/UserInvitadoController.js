/**
 * UserInvitadoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
module.exports = {
  //requiere User_ID, id del usuario admin que lo invito
  create: async (req, res) => {
    let userChief;
    await User.findOne({
      id: req.param("id"),
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        userChief = doc;
        if (userChief.isAdmin) {
          await UserInvitado.create(
            {
              nombre: req.param("nombre"),
              correo: req.param("correo"),
              telefono: req.param("telefono"),
              direccion: req.param("direccion"),
              //isAdmin: req.param("isAdmin"),
              acceso: req.param("acceso"),
              invitadoBY: userChief.id,
            },
            (err) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Falló la operación",
                });
              } else {
                return res.send({
                  autorizado: true,
                  success: true,
                  message: "Invitado registrado con éxito",
                });
              }
            }
          );
        } else {
          return res.send({
            autorizado: false,
            message: "No está autorizado",
          });
        }
      }
    });
  },

  addCampaigns: async (req, res) => {
    let camp;
    await Campaign.findOne({
      nombre: req.param("nombre"),
    }).then((doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc.id;
      }
    });
    await UserInvitado.findOne({
      id: req.param("id"),
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        await UserInvitado.addToCollection(doc.id, "campaigns", camp)
          .then((campInv) => {
            return res.send({
              message: "Asociado a la Campaña con éxito",
              data: campInv,
            });
          })
          .catch((err) => {
            sails.log.debug(err);
            return res.send({
              success: false,
              message: "Falló la operación",
            });
          });
      }
    });
  },

  getCampXInvitado: async (req, res) => {
    await UserInvitado.findOne({
      id: req.param("id"),
    })
      .populate("campaigns")
      .then((doc) => {
        return res.send({
          message: "Campañas asociadas",
          data: doc.campaigns,
        });
      })
      .catch((err) => {
        sails.log.debug(err);
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      });
  },

  //requiere User_ID, id del usuario admin que lo invito
  getInvXUserChief: async (req, res) => {
    let userID;
    await User.findOne({
      id: req.param("id"),
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        userID = doc;
        await UserInvitado.find({
          invitadoBY: userID.id,
        })
          .populate("invitadoBY")
          .then((data) => {
            return res.send({
              message: "Tus Invitados",
              data: data,
            });
          })
          .catch((err) => {
            sails.log.debug(err);
            return res.send({
              success: false,
              message: "Falló la operación",
            });
          });
      }
    });
  },

  getInvitados: async (req, res) => {
    await UserInvitado.find()
      .then((doc) => {
        return res.send({
          success: true,
          data: doc,
        });
      })
      .catch((err) => {
        sails.log.debug(err);
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      });
  },

  getInvitadoById: (req, res) => {
    UserInvitado.findOne({ id: req.param("id") })
      .then((user) => {
        return res.send({
          data: user,
        });
      })
      .catch((err) => {
        return res.sendStatus(500, {
          error: err,
        });
      });
  },

  updateInfo: async (req, res) => {
    UserInvitado.updateOne(
      {
        where: { id: req.param("id") },
      },
      {
        nombre: req.param("nombre"),
        correo: req.param("correo"),
        telefono: req.param("telefono"),
        direccion: req.param("direccion"),
      }
    )
      .then((user) => {
        return res.send({
          data: user,
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      });
  },

  updateAcces: async (req, res) => {
    UserInvitado.updateOne(
      {
        id: req.param("id"),
      },
      {
        acceso: req.param("acceso"),
      })
      .then((user) => {
        return res.send({
          data: user,
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      })
  },

  updatePass: async (req, res) => {
    let salt = await bcrypt.genSalt(10);
    let hashpass = await bcrypt.hash(req.param("password"), salt);
    UserInvitado.updateOne(
      {
        id: req.param("id"),
      },
      {
        password: hashpass,
      })
      .then((user) => {
        return res.send({
          data: user,
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      });
  },

  /*updateisAdmin: async (req, res) => {
    UserInvitado.updateOne(
      {
        id: req.param("id"),
      },
      {
        isAdmin: req.param("isAdmin"),
      },
      (err) => {
        if (err) {
          console.log(`Error: ` + err);
        } else {
          return res.send({
            success: true,
            message: "Privilegio actualizado",
          });
        }
      }
    );
  },*/

  deleteUserInvitado: async (req, res) => {
    UserInvitado.destroy({
      id: req.param("id"),
    })
      .then((user) => {
        return res.send({
          data: user,
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Falló la operación",
        });
      });
  },
};
