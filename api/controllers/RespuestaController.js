/**
 * RespuestaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    create: async function (req, res) {
        let user
        let campaign
        let question
        await User.findOne({
            email: req.param('email')
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    user = doc

            }
        });
        await Campaign.findOne({
            nombre: req.param('nombre'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    campaign = doc

            }
        });
        await Pregunta.findOne({
            id: req.param('id'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    question = doc

            }
        });
        await Respuesta.create({
            texto: req.param('texto'),
            fecha: req.param('fecha'),
            userRes: user.id,
            campaign: campaign.id,
            ques: question.id
        }).then(function (respuesta) {
            return res.send({
                'success': true,
                'message': 'Respuesta enviada',
                'data': respuesta
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, respuesta no enviada'
                })
            })
    },

    deleteAllRespuesta: async function (req, res) {

        await Respuestas.destroy({
            id: req.params.id
        }).then(respuesta => {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todas las respuestas',
                'data': respuesta
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

    getRespuesta: async (req, res) => {
        const page = req.param('page')
        //const limit = req.param('limit')
        //console.log(page);
        let campID = await Campaign.findOne({ id: req.param('id') })
        Respuesta.find({
            where: { campaign: campID.id },
        })
            .paginate(
                page,
                5
            )
            .then(respuesta => {
                return res.send({
                    'message': 'Lista de Respuestas',
                    'data': respuesta,
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            })
    },
};

