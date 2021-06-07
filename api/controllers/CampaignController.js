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

    //Requiere ID de la campaña
    getInvitadoXCamp: async (req, res) => {
        await Campaign.findOne({
            id: req.param('id')
        }
        ).populate('userInvitados').then((doc) => {
            return res.send({
                message: 'Usuarios Invitados',
                data: doc.userInvitados
            })
        })
            .catch(err => {
                sails.log.debug(err);
                return res.send({
                    success: false,
                    message: 'Falló la operación'
                })
            })
    },

    getCampaignById(req,res){
        camp_id = req.param('id');
        if(!camp_id){
            return res.status(400).send({'Error': 'Id Most Be Provided'}); 
        }
        Campaign.findOne({id:camp_id})
        .then(campaign=>{
            return res.send({
                'message': 'Selected Campaign',
                'data': campaign,
            });
        })
        .catch(error=>{
            return res.status(500).send({'error': error});
        })
    },

   getCampaign: (req, res) => {
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
    },

    getCampaignbyUser: async (req, res) => {
        const page = req.param('page');
        const limit  = Number(req.param('limit'));
        const sortCriteria  = req.param('criteria');
        const filter = req.param('filter');
        const token = req.header('Authorization').split('Bearer ')[1];
        sails.log.debug(limit);
        await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
            if(err) return res.status(500).send({'error': err});
            if(!filter || filter===''){
                await Campaign.find({
                    userChief: payload._id,
                    })
                  .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
                  .paginate(
                    page?page:'',
                    limit?limit:99999999)
                .then(data => {
                        return res.send({
                            'message': 'Lista de tus Campañas',
                            'data': data,
                            'count': data.length
    
                        })
                    })
                .catch(err => {
                    return res.sendStatus(500);
                });
              }else{
                await Campaign.find({
                    userChief: payload._id,
                  })
                .where({
                  or:[
                    { nombre: { startsWith: filter } },
                    { contanctoTelefono: { startsWith: filter } },
                    { direccionPostal: { startsWith: filter } },
                    { contactoTelegram: { startsWith: filter } },
                    { contactoFacebook: { startsWith: filter } },
                    { contactoWhatsapp: { startsWith: filter } }
                  ]
                })
                .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
                .paginate(
                  page?page:'',
                  limit?limit:99999999)
                .then(campaigns => {
                  return res.send({
                    'success': true,
                    'message': 'Records Fetched',
                    //'files': images,
                    'data': campaigns,
                    'count': campaigns.length
                  })
                })
                .catch(err=>{
                  return res.status(500).send({'error': err});
                });
              }
    
        })
        //const page = req.param('page')
        //let user = await User.findOne({ id: req.param('id') })
        
       

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

    },
    countUserCampaigns: async (req,res)=>{
        const token = req.header('Authorization').split('Bearer ')[1];
        await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
            if(err) return res.status(500).send({'error': err});
            await Campaign.count({
            where: { userChief: payload._id},
            })
            .then(result => {
            return res.send({
                'success': true,
                'message': 'Records Counted',
                //'files': images,
                'data': result
            })
            })
            .catch(err=>{
            return res.status(500).send({'error': err});
            });

        });
    }
};

