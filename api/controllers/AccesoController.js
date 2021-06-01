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
      id: req.param("campID"),
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc.id;
        await UserInvitado.findOne({
          id: req.param("id"),
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc;
            await Acceso.create(
              {
                acceso: true,
                campaign: camp,
                userInv: userinv.id,
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

  getStatusAcceso: async (req, res) => {
    let userinv;
    let camp;
    await Campaign.findOne({
      id: req.param("campID"),
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc.id;
        await UserInvitado.findOne({
          id: req.param("id"),
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc;
            await Acceso.findOne({
              where: { campaign: camp, userInv: userinv.id },
            })
              .then((data) => {
                return res.send({
                  success: true,
                  message: "Estado de Acceso",
                  data: data.acceso,
                });
              })
              .catch((err) => {
                return res.send({
                  success: false,
                  message: "Imposible Determinar",
                  error: err,
                });
              });
          }
        });
      }
    });
  },
};
