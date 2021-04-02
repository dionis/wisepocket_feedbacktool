/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');  //NO ES NECESARIO

module.exports = {

    //DEJAR SOLO EL SERVICE MOSTRAR CAMPAÑA POR USUARIO
    //DE MOMENTO SE DEJAN LOS SERVICIOS PARA CREAR BASE DE DATOS TEMPORAL

   create: async (req, res) => {
        //if (!req.param()) { return res.sendStatus(400); }
        const token = req.header('Authorization').split('Bearer ')[1];
        sails.log.debug(token);
        const payload = await jwt.decode(token);
        sails.log.debug(payload);
        await User.findOne({
            id: payload._id,
        }).then(async function (user) {
            if (user) {
                await Campaign.create({
                    nombre: req.param('nombre'),
                    fecha: req.param('fecha'),
                   // userCamp: user.id,
                    userChief: user.id,
                    user: req.param('user'),
                   // logo: req.param('logo'),
                    descripcion: req.param('descripcion'),
                    contanctoTelefono: req.param('contanctoTelefono'),
                    colorPrincipal: req.param('colorPrincipal'),
                    colorSecundario: req.param('colorSecundario'),
                    contactoEmail: req.param('contactoEmail'),
                    direccionPostal: req.param('direccionPostal'),
                    contactoTelegram: req.param('contactoTelegram'),
                    contactoWhatsapp: req.param('contactoWhatsapp'),
                    contactoFacebook: req.param('contactoFacebook')
                }).fetch()
                    .then(async function (campaign) {
                        return res.send({
                            'success': true,
                            'message': 'Record Created',
                            'data': campaign
                        })
                    })
                    .catch(err => {
                        sails.log.debug(err)
                        return res.sendStatus(500);
                    })
            }
        })
    },

   /* editCampaign: (req, res) => {
        if (!req.param('id')) { return req.sendStatus(400) }
        return Campaign.update({ id: req.param('id') }, req.allParams()).fetch()
            .then(campaign => {
                return res.send({
                    'message': 'Record Edited',
                    'data': campaign
                })
            })
            .catch(err => {
                return res.sendStatus(500);
            })
    },

    deleteCampaign: (req, res) => {
        return Campaign.destroy(req.param('id')).fetch()
            .then(campaign => {
                return res.send({
                    'message': 'Record Deleted',
                    'data': campaign
                })
            })
            .catch(err => {
                return res.sendStatus(500);
            })
    },*/

<<<<<<< HEAD
    getCampaign: (req, res) => {
      console.log("<----[[[ <== |||| ==> ]]]---->");
=======
  /* getCampaign: (req, res) => {
>>>>>>> 5dccca8f5518a5cab59448670fbfdc3fc39f8084
        Campaign.find().populate('userChief')
            .then(campaign => {
               console.log("<-------->");
                return res.send({
                    'message': 'Lista de Campañas',
                    'data': campaign,
                })
            })
            .catch(err => {
                return res.sendStatus(400, {
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            })
    },*/

    getCampaignbyUser: async (req, res) => {
        if (!req.param('id')) {
            return res.sendStatus({
                'error': 'User ID no encontrado en el Request'
            })
        }
        const page = req.param('page')
        let userID = await User.findOne({ id: req.param('id') })
        await Campaign.find({
            where: { userChief: userID.id  },
        }).paginate(
            page,
            5
        ).then(data => {
                return res.send({
                    'message': 'Lista de tus Campañas',
                    'data': data
                })
            })
            .catch(err => {
                return res.sendStatus(500);
            })

        // User.findOne(req.param('_id'), (err,user)=>{
        //     if(err){
        //         return res.sendStatus(500);
        //     }
        //     if (!user) {return res.status(400).send('User Not Found');}
        //     Camping.find(user,(error,campaign)=>{
        //         if(error){
        //             return res.sendStatus(500);
        //         }
        //         if (!campaign || campaign.length === 0) {
        //             return res.sendStatus(400,{
        //                 'message':'NO existen Campañas'
        //             });
        //         }
        //         return res.send({
        //             'message': 'Lista de Campañas',
        //             'data': campaign
        //         })
        //     })
        // })

    }
};

