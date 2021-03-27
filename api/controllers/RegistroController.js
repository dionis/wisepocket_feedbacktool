/**
 * RegistroController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {

        await Registro.create({
            texto: req.param('texto'),
            evento: req.param('evento'),
            fecha: req.param('fecha')
        }).then(function (registro) {
            return res.send({
                'success': true,
                'message': 'Registro creado',
                'data': registro
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, registro no enviado'
                })
            })
    },


    deleteAllRegistro: async function (req, res) {

        await Registro.destroy({
            id: req.params.id
        }).then(registro => {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todos los registros',
                'data': registro
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

    getRegistro: (req, res) => {
        const page = req.param('page')
        //const limit = req.param('limit')
        //console.log(page);
        Registro.find()
            .paginate(
                page,
                5
            )
            .then(registro => {
                return res.send({
                    'message': 'Registros',
                    'data': registro,
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            })
    },

    getAllRegistro: async function (req, res) {

        let reg = await Registro.find()

        if (reg.length === 0) {
            return res.send({
                'message': 'No hay Registros'
            })
        }

        else if (reg) {
            return res.send({
                'message': 'Todos los registros',
                'data': reg
            })
        }
        else {
            return res.status(500).send({
                'message': 'Imposible Mostrar',
                'error': err
            })
        }


    },

};

