/**
 * UserInvitadoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res) {

        await UserInvitado.create({
            nombre: req.param('nombre'),
            correo: req.param('correo'),
            telefono: req.param('telefono'),
            direccion: req.param('direccion'),
            isAdmin: req.param('isAdmin'),
            acceso: req.param('acceso')
        }, (err) => {
            if (err) {
                sails.log.debug(err);
                return res.sendStatus(500);
            }
            else {
                return res.send(
                    'Invitado registrado con éxito'
                )
            }
        })
    },


    addCampaigns: async function (req, res) {
        let camp
        await Campaign.findOne({
            nombre: req.param('nombre'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado")
                camp = doc.id
            }
        });
        await UserInvitado.findOne({
            id: req.param('id'),
        }).then(async (doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado")
                await UserInvitado.addToCollection(doc.id, 'campInvitado', camp).then(campInv => {
                    return res.send({
                        'success': true,
                        'data': campInv
                    })
                })
                    .catch(err => {
                        sails.log.debug(err);
                        return res.send({
                            'success': false,
                            'message': 'Falló la operación'
                        })
                    })
            }
        });
    },

    //AUN SE ESTA TRABAJANDO
    getUserandCamps: async function (req, res) {
        await UserInvitado.find({
            id: req.param('id') 
        }).populate('campInvitado'), (err, docs) => {
            if (err) {
                console.log(`Error: ` + err)
            } else {
                if (docs.length === 0) {
                    console.log("Vacio")
                } else {
                    res.send({
                        'data': docs
                    })
                }
            }
        };
    },

    getUsers: async function (req, res) {
        await UserInvitado.find().then(doc => {
            return res.send({
                'success': true,
                'data': doc
            })
        })
            .catch(err => {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló la operación'
                })
            })
    },

    updateAcces: async function (req, res) {
        UserInvitado.updateOne({
            id: req.param('id')
        }, {
            acceso: req.param('acceso')
        }, (err) => {
            if (err) {
                console.log(`Error: ` + err)
            } else {
                return res.send('Actualizado con éxito')
            }
        });
    },

    updateisAdmin: async function (req, res) {
        UserInvitado.updateOne({
            id: req.param('id')
        }, {
            isAdmin: req.param('isAdmin')
        }, (err) => {
            if (err) {
                console.log(`Error: ` + err)
            } else {
                return res.send('Actualizado con éxito')
            }
        });
    },

    deleteUserInvitado: async function (req, res) {
        UserInvitado.destroy({
            id: req.param('id')
        }, (err) => {
            if (err) {
                console.log(`Error: ` + err)
            } else {
                return res.send('Eliminado con éxito')
            }
        });
    }
}


