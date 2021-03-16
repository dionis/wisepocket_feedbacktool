/**
 * EntidadOpinionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res) {
        let opinion
        await Opinion.findOne({
            id: req.param('id'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    opinion = doc

            }
        });
        await EntidadOpinion.create({
            texto: req.param('texto'),
            start: req.param('start'),
            end: req.param('end'),
            opinion: opinion.id
        }).then(function (entidadopinion) {
            return res.send({
                'success': true,
                'message': 'Entidades enviadas',
                'data': entidadopinion
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, entidad no enviada'
                })
            })
    },

    deleteAllEntidad: async function (req, res) {

        await EntidadOpinion.destroy({
            id: req.params.id
        }).then(function (entidadopinion) {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todas las entidades',
                'data': entidadopinion
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

    getEntidad: async (req, res) => {
        const page = req.param('page')
        //const limit = req.param('limit')
        //console.log(page);
        let opinID = await Opinion.findOne({ id: req.param('id') })
        EntidadOpinion.find({
            where: { opinion: opinID.id },
        })
            /*.paginate(
                page,
                5
            )*/
            .then(entidadopinion => {
                return res.send({
                    'message': 'Lista de Entidades',
                    'data': entidadopinion,
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

