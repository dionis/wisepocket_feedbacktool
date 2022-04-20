/**
 * PreguntaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    create: async function (req, res) {
        let userend
        let campaign
        await UserEnd.findOne({
            email: req.param('email'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    userend = doc

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
        await Pregunta.create({
            texto: req.param('texto'),
            fecha: req.param('fecha'),
            quesUserend: userend.id,
            campaign: campaign.id
        }).then(pregunta => {
            return res.send({
                'success': true,
                'message': 'Pregunta enviada',
                'data': pregunta
            })
        })
            .catch(err => {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, pregunta no enviada'
                })
            })
    },

    deletePregunta: async function (req, res) {
        await Pregunta.findOne({
            id: req.param('id')
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
                return res.send({
                    'success': false,
                    'message': 'Pregunta no encontrada'
                })
            } else {
                console.log("Encontrado"),
                    Pregunta.destroy({
                        id: req.param('id')
                    }).then(function (pregunta) {
                        return res.send({
                            'success': true,
                            'message': 'Pregunta eliminada',
                            'data': pregunta
                        })
                    })
                        .catch(function (err) {
                            sails.log.debug(err);
                            return res.send({
                                'success': false,
                                'message': 'Pregunta no eliminada'
                            })
                        })
            }
        })
    },

    deleteAllPregunta: async function (req, res) {

        await Pregunta.destroy({
            id: req.params.id
        }).then(function (pregunta) {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todas las preguntas',
                'data': pregunta
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló la operación'
                })
            })
    },

    getPregunta: async (req, res) => {
        const page = req.param('page')
        //const limit = req.param('limit')
        //console.log(page);
        let campID = await Campaign.findOne({ id: req.param('id') })
        await Pregunta.find({
            where: { campaign: campID.id },
        })
            .paginate(
                page,
                5
            )
            .then(pregunta => {
                return res.send({
                    'message': 'Lista de Preguntas',
                    'data': pregunta,
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

