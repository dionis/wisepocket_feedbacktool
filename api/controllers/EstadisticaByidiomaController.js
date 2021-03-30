/**
 * EstadisticaByidiomaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    create: async (req, res) => {

        let campaign = await Campaign.findOne({ id: req.param('id') })
            .then((doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        userend = doc

                }
            });
        await EstadisticaByidioma.create({
            cantEnglish: req.param('cantEnglish'),
            cantSpanish: req.param('cantSpanish'),
            campaign: campaign
        }).then(function (estadistica) {
            return res.send({
                'success': true,
                'message': 'Estadistica realizada',
                'data': estadistica
            })
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })
    },

    getEstadistica: async (req, res) => {

        let campID = await Campaign.findOne({ id: req.param('id') })
        EstadisticaByidioma.find({
            where: { campaign: campID.id },
        })
            .then(estadistica => {
                return res.send({
                    'message': 'Estadisticas Opinion por idioma',
                    'data': estadistica,
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

