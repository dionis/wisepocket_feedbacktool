/**
 * AccesoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  darAcceso: async (req, res) => {
    let userinv;
    let camp;
    await Campaign.findOne({
      where: { id: req.param("campID") },
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc.id;
        await UserInvitado.findOne({
          where: { nombre: req.param("nombre") },
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc.id;
            await Acceso.create(
              {
                acceso: true,
                campaign: camp,
                userInv: userinv,
              },
              (err) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: "Falló la operación",
                  });
                } else {
                  return res.send({
                    success: true,
                    message: "Ahora tiene acceso",
                  });
                }
              }
            );
          }
        });
      }
    });
  },

  quitarAcceso: async (req, res) => {
    await Acceso.updateOne(
      {
        where: { userInv: req.param("id"), campaign: req.param("campID") },
      },
      {
        acceso: false,
      },

      (err) => {
        if (err) {
          sails.log.debug(err);
          return res.send({
            success: false,
            message: "Falló la operación",
          });
        } else {
          return res.send({
            success: true,
            message: "Ya no tiene acceso",
          });
        }
      }
    );
  },

  devolverAcceso: async (req, res) => {
    await Acceso.updateOne(
      {
        where: { userInv: req.param("id"), campaign: req.param("campID") },
      },
      {
        acceso: true,
      },

      (err) => {
        if (err) {
          sails.log.debug(err);
          return res.send({
            success: false,
            message: "Falló la operación",
          });
        } else {
          return res.send({
            success: true,
            message: "Tiene acceso",
          });
        }
      }
    );
  },

  getStatusAcceso: async (req, res) => {
    let camp = String(req.param("campID"));
    let userInv = String(req.param("id"));
    console.log(userInv);
    console.log(camp);
    if (Acceso) {
      await Acceso.findOne({
        where: { userInv: userInv, campaign: camp },
      })
        .then(function (data) {
          console.log("StatusAccesData>> ", data);
          if (data.acceso) {
            return res.send({
              success: true,
              message: "Tiene acceso",
              data: true,
            });
          } else {
            return res.send({
              success: false,
              message: "No tiene acceso",
              data: false,
            });
          }
        })
        .catch((err) => {
          if (err) {
            return res.send({
              success: false,
              message: "No hay asociados",
              data: false,
            });
          }
        });
    } else {
      return res.send({
        success: false,
        message: "No hay asociados",
        data: false,
      });
    }
  },

  deleteAcces: async (req, res) => {
    let camp = String(req.param("campID"));
    let userInv = String(req.param("id"));
    await Campaign.findOne({
      where: { id: camp },
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        await UserInvitado.findOne({
          where: { id: userInv },
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc.id;
            await Acceso.destroy(
              {
                where: { campaign: camp, userInv: userInv },
              },
              (err) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: "Falló la operación",
                  });
                } else {
                  return res.send({
                    success: true,
                    message: "Acceso eliminado",
                  });
                }
              }
            );
          }
        });
      }
    });
  },

  isAsociado: async (req, res) => {
    let camp = String(req.param("campID"));
    let userInv = String(req.param("id"));
    await Acceso.findOne({
      where: { userInv: userInv, campaign: camp },
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
        return res.send({
          success: true, // true para si no esta asociado pues vincularlo
          message: "No esta vinculado",
          data: true,
        });
      } else {
        console.log("Encontrado");
        return res.send({
          success: false, // false para si esta asociado pues no vincularlo
          message: "Esta vinculado",
          data: doc,
        });
      }
    });
  },
};
