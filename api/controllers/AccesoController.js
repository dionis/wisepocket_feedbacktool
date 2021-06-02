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
    await Campaign.find({
      where: { id: req.param("campID") },
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc[0].id;
        await UserInvitado.find({
          where: { id: req.param("id") },
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc[0].id;
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
    await Acceso.update(
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

  getStatusAcceso: async (req, res) => {
    let userinv;
    let camp;
    let status;
    await Campaign.find({
      where: { id: req.param("campID") },
    }).then(async (doc) => {
      if (!doc) {
        console.log("No encontrado");
      } else {
        console.log("Encontrado");
        camp = doc[0].id;
        await UserInvitado.find({
          where: { id: req.param("id") },
        }).then(async (doc) => {
          if (!doc) {
            console.log("No encontrado");
          } else {
            console.log("Encontrado");
            userinv = doc[0].id;
            await Acceso.find({
              where: { campaign: camp, userInv: userinv },
            }).then((doc) => {
              if (!doc) {
                console.log("Estado de acceso no determinado");
                return res.send({
                  success: false,
                  message: "Imposible Determinar",
                });
              } else {
                console.log("Acceso determinado");
                status = doc.acceso;
                return res.send({
                  success: true,
                  message: "Estado de Acceso",
                  data: status,
                });
              }
            });
          }
        });
      }
    });
  },
};
