/**
 * EstadisticaByidiomaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    //Requiere ID de la Campaña
    updateEstadIdioma: async (req, res) => {
        if (!req.param('id')) { return req.sendStatus(400) }
        let totalOpin
        let campaign
        let ingles
        let español
        await Campaign.findOne({ id: req.param('id') })
            .then((doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc

                }
            });
        await Opinion.count({
            campaign: campaign.id,
            idioma: 'ingles'
        }).then(function (count) {
            ingles = count
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })
        await Opinion.count({
            campaign: campaign.id,
            idioma: 'español'
        }).then(function (count) {
            español = count
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })

        await Opinion.count({ campaign: campaign.id })
            .then(function (count) {
                totalOpin = count
            })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })

        await EstadisticaByidioma.update({ campaign: campaign.id }).set({
            cantEnglish: ingles,
            cantSpanish: español,
            totalOpin: totalOpin,
        })
            .then(function (estadidioma) {
                return res.send({
                    'success': false,
                    'message': 'Actualizado',
                    'data': estadidioma
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


    //Requiere ID de la Campaña
    create: async (req, res) => {
        let campaign
        let totalOpin
        let ingles
        let español
        await Campaign.findOne({ id: req.param('id') })
            .then((doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc

                }
            });
        await Opinion.count({
            campaign: campaign.id,
            idioma: 'ingles'
        }).then(function (count) {
            ingles = count
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })
        await Opinion.count({
            campaign: campaign.id,
            idioma: 'español'
        }).then(function (count) {
            español = count
        })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })
        await Opinion.count({ campaign: campaign.id })
            .then(function (count) {
                totalOpin = count
            })
            .catch(function (err) {
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Falló'
                })
            })

        await EstadisticaByidioma.create({
            cantEnglish: ingles,
            cantSpanish: español,
            totalOpin: totalOpin,
            campaign: campaign.id
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

    //Requiere ID de la Campaña
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

