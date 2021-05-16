/**
 * OpinionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //function beta
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
        await Opinion.create({
            texto: req.param('texto'),
            fecha: req.param('fecha'),
            createDay: req.param('createtime'),
            idioma: req.param('idioma'),
            polaridad: req.param('polaridad'),
            aspectos: req.param('aspectos'),
            entidades: req.param('entidades'),
            userend: userend.id,
            campaign: campaign.id
        }).then(function (opinion) {
            return res.send({
                'success': true,
                'message': 'Opinion enviada',
                'data': opinion
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló, opinion no enviada'
                })
            })
    },



    /* deleteOpinion: async function (req, res) {
         await Opinion.findOne({
             id: req.param('id')
         }).then((doc) => {
             if (!doc) {
                 console.log("No encontrado")
                 return res.send({
                     'success': false,
                     'message': 'Opinion no encontrada'
                 })
             } else {
                 console.log("Encontrado"),
                     Opinion.destroy({
                         id: req.param('id')
                     }).then(function (opinion) {
                         return res.send({
                             'success': true,
                             'message': 'Opinion eliminada',
                             'data': opinion
                         })
                     })
                         .catch(function (err) {
                             sails.log.debug(err);
                             return res.send({
                                 'success': false,
                                 'message': 'Opinion no eliminada'
                             })
                         })
             }
         })
     },*/


    //Requiere id de Campaña
    deleteAllOpinion: async function (req, res) {
        let campaign
        await Campaign.findOne({
            id: req.param('id'),
        }).then((doc) => {
            if (!doc) {
                console.log("No encontrado")
            } else {
                console.log("Encontrado"),
                    campaign = doc

            }
        });
        await Opinion.destroy({
            where: { campaign: campaign.id },
            id: req.params.id
        }).then(function (opinion) {
            return res.send({
                'success': true,
                'message': 'Se han eliminado todas las opiniones',
                'data': opinion
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

    //Requiere ID de la Campaña y la pagina
    getOpinion: async (req, res) => {
        const page = req.param('page')
        let campID = await Campaign.findOne({ id: req.param('id') })
        await Opinion.find({
            where: { campaign: campID.id },
        }).populate('userend')
            .paginate(
                page,
                5
            )
            .then(opinion => {
                return res.send({
                    'message': 'Lista de Opiniones',
                    'data': opinion,
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            })
    },

    //Requiere ID de la Campaña, la pagina y el idioma que se quiere
    getOpinionXIdiomaCamp: async (req, res) => {
        const page = req.param('page')
        let campID = await Campaign.findOne({ id: req.param('id') })
        let idioma = req.param('idioma')
        await Opinion.find({
            where: { campaign: campID.id, idioma: idioma },
        }).populate('userend')
            .paginate(
                page,
                10
            )
            .then(opinion => {
                return res.send({
                    'message': 'Lista de Opiniones en ' + idioma,
                    'data': opinion,
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            })
    },
}



