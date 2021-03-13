/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //BETA ARREGLAR
    /*create: async (req,res)=>{
        if(!req.body){ return res.sendStatus(400);}
        const token = req.header('Authorization').split('Bearer ')[1];
        sails.log.debug(token);
        const payload = await jwt.decode(token);
        sails.log.debug(payload);
        await User.findOne({id:payload._id}, async (err, user)=> {
            if (err) { 
                return res.sendStatus(500);
            }
            await Campaign.create({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                contanctoTelefono: req.body.contanctoTelefono,
                colorPrincipal: req.body.colorPrincipal,
                colorSecundario: req.body.colorSecundario,
                contactoEmail: req.body.contactoEmail,
                direccionPostal: req.body.direccionPostal,
                contactoTelegram: req.body.contactoTelegram,
                contactoWhatsapp: req.body.contactoWhatsapp,
                contactoFacebook: req.body.contactoFacebook,
                createdby: user.id
            }).fetch()
            .then(campaign=>{
                return res.send({
                    'success': true,
                    'message': 'Record Created',
                    'data': campaign
                })
            })
            .catch(err=>{
                return res.sendStatus(500); 
            })
        })

    },

    editCampaign: (req,res)=>{
        if(!req.param('camp')){return req.sendStatus(400)}
        return Campaign.update({id:req.param('camp')},req.allParams()).fetch()
        .then(campaign=>{
            return res.send({
                'message': 'Record Edited',
                'data': campaign
            })
        })
        .catch(err=>{
            return res.sendStatus(500);
        })
    },

    deleteCampaign: (req,res)=>{
        return Campaign.destroy(req.param('camp')).fetch()
        .then(campaign =>{
            return res.send({
                'message': 'Record Deleted',
                'data': campaign
            })
        })
        .catch(err=>{
            return res.sendStatus(500);
        })
    },
  
    getCampaign: (req,res)=>{
        Campaign.find().populate('userChief')
        .then(campaign =>{
            return res.send({
                'message': 'Lista de Campañas',
                'data': campaign,
            })
        })
        .catch(err=>{
            return res.sendStatus(400,{
                'message': 'Imposible Mostrar',
                'error': err
            })
        })
    },

    getCampaignbyUser: async (req,res)=>{
        if(!req.param('_id')){
            return res.sendStatus({
                'error': 'User ID no encontrado en el Request'
            })
        }
        const us = await User.findOne({
            where: {id: req.param('_id')},
            select: ['campaign']
        }).populate('campaign')
        .then(data => {
            return res.send({
                'data': data
            })
        })
        .catch(err=>{
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
    */
};

