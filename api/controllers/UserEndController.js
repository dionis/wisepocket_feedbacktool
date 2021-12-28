/**
 * UserEndController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Opinion = require("../models/Opinion");



module.exports = {
  
    create: async function (req, res) {

        await UserEnd.create({
            name_alias: req.param('name_alias'),
            email: req.param('email'),
        }, (err) => {
            if (err) {
                sails.log.debug(err);
                return res.sendStatus(500);
            }
            else {
                return res.send(
                    'Usuario cliente realizado con exito'
                )
            }
        })
    },

    deleteAllUserEnd: async function (req, res) {

        await UserEnd.destroy({
            id: req.params.id
        }).then(userend => {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todos los usuarios',
                'data': userend
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

};

