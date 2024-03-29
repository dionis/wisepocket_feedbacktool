/**
 * AspectoOpinionController
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
        await AspectoOpinion.create({
            texto: req.param('texto'),
            polaridad: req.param('polaridad'),
            start: req.param('start'),
            end: req.param('end'),
            opinion: opinion.id
        }).then(function (aspectoopinion) {
            return res.send({
                'success': true,
                'message': 'Aspectos enviados',
                'data': aspectoopinion
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, aspectos no enviada'
                })
            })
    },

    deleteAllAspecto: async function (req, res) {

        await AspectoOpinion.destroy({
            id: req.params.id
        }).then(function (aspectoopinion) {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todas los aspectos',
                'data': aspectoopinion
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

    getAspecto: async (req, res) => {
        const page = req.param('page');
        const limit = req.param('limit');
        const opinionId = req.param('id');
        //console.log(page);
        //let opinID = await Opinion.findOne({ id: req.param('id') })
        let total = await AspectoOpinion.count({where: { opinion: opinionId }})
        await AspectoOpinion.find({
            where: { opinion: opinionId },
        })
        .paginate(
            page?page:'',
            limit?limit:99999999
        )
        .then(aspectoopinion => {
            return res.send({
                'message': 'Lista de Aspectos',
                'data': aspectoopinion,
                'count': total
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

