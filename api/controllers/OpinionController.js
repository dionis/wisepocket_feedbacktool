/**
 * OpinionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment  = require('moment');
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
        const page = req.param('page');
        const limit  = Number(req.param('limit'));
        const sortCriteria  = req.param('criteria');
        const filter = req.param('filter');
        console.log("Find campaing id ===> ", req.param('id'))
        let campID = await Campaign.findOne({ id: req.param('id')})
        if(!campID){return res.status(400).send({'ERROR': 'Campaign ID not Match'})}
        if(!filter || filter===''){
            await Opinion.find(
                {where: { campaign: campID.id },}
                )
            .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
            .populate('userend')
            .paginate(
                page?page:'',
                limit?limit:99999999
            )
            .then(opinion => {
                return res.send({
                    'message': 'Lista de Opiniones',
                    'data': opinion,
                    'count': opinion.length
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            });
        }else{
            await Opinion.find(
                 { campaign: campID.id }
                )
            .where({
                or:[
                    { id: { startsWith: filter } },
                    { fecha: { startsWith: filter } },
                ]
            })
            .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
            .populate('userend')
            .paginate(
                page?page:'',
                limit?limit:99999999
            )
            .then(opinion => {
                return res.send({
                    'message': 'Lista de Opiniones',
                    'data': opinion,
                    'count': opinion.length
                })
            })
            .catch(err => {
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': err
                })
            });
        }
        
    },

    getOpinionbyFilter: async (req,res)=>{
        const page = req.param('page');
        const limit  = Number(req.param('limit'));
       const camp_id = req.param('id')
       const handle = req.param('handle')
       let date;
       let total = 0;
       switch (handle) {
        case 'all':
            total = await Opinion.count();
            await Opinion.find()
            .sort('fecha ASC')
            .populate('userend')
            .paginate(
                page?page:'',
                limit?limit:99999999
            )
            .then(opinions=>{
                return res.send({
                    'data': opinions,
                    'count': total
                })
            })
            .catch(error=>{
                 return res.status(500).send({
                     'message': 'Imposible Mostrar',
                     'error': error
                 })
            })
            break;
        case 'today':
            date = moment().format();
            sails.log.debug(date);
            total = await Opinion.count({where: {campaign: camp_id, fecha: { '>=': date }}})
            await Opinion.find({
                where: {campaign: camp_id, fecha: { '>=': date }}
            })
            .sort('fecha ASC')
            .populate('userend')
            .paginate(
                page?page:'',
                limit?limit:99999999
            )
            .then(opinions=>{
                return res.send({
                    'data': opinions,
                    'count': total
                })
            })
            .catch(error=>{
                 return res.status(500).send({
                     'message': 'Imposible Mostrar',
                     'error': error
                 })
            })
            break;
        case 'yesterday':
            date = moment().subtract(1, 'days').format();
            sails.log.debug(date);
            total = await Opinion.count({where: {campaign: camp_id, fecha: { '>=': date }}})
            await Opinion.find({
                where: {campaign: camp_id, fecha: { '>=': date }}
            })
            .sort('fecha ASC')
            .populate('userend')
            .paginate(
                page?page:'',
                limit?limit:99999999
            )
            .then(opinions=>{
                return res.send({
                    'data': opinions,
                    'count': total
                })
            })
            .catch(error=>{
                return res.status(500).send({
                    'message': 'Imposible Mostrar',
                    'error': error
                })
            })
        break;
           case 'last 15 days':
               date = moment().subtract(15, 'days').format();
               sails.log.debug(date);
               total = await Opinion.count({ where: {campaign: camp_id, fecha: { '>=': date }}})
               await Opinion.find({
                   where: {campaign: camp_id, fecha: { '>=': date }}
               })
               .sort('fecha ASC')
               .populate('userend')
               .paginate(
                page?page:'',
                limit?limit:99999999
                )
               .then(opinions=>{
                   return res.send({
                       'data': opinions,
                       'count': total
                   })
               })
               .catch(error=>{
                    return res.status(500).send({
                        'message': 'Imposible Mostrar',
                        'error': error
                    })
               })
               break;
            case 'positive':
                total = await Opinion.count({ where: {campaign: camp_id, or:[
                    { polaridad: 'positive' },
                    { polaridad: 'positiva' },
                    ]}})
                await Opinion.find({
                    where: {campaign: camp_id, or:[
                        { polaridad: 'positive' },
                        { polaridad: 'positiva' },
                        ]}
                })
                .sort('fecha ASC')
                .populate('userend')
                .paginate(
                    page?page:'',
                    limit?limit:99999999
                )
                .then(opinions=>{
                    return res.send({
                        'data': opinions,
                        'count': total
                    })
                })
                .catch(error=>{
                     return res.status(500).send({
                         'message': 'Imposible Mostrar',
                         'error': error
                     })
                })
                break;
            case 'negative':
                total = await Opinion.count({ where: {campaign: camp_id, or:[
                    { polaridad: 'negative' },
                    { polaridad: 'negativa' },
                    ]}})
                await Opinion.find({
                    where: {campaign: camp_id, or:[
                        { polaridad: 'negative' },
                        { polaridad: 'negativa' },
                        ]}
                })
                .sort('fecha ASC')
                .populate('userend')
                .paginate(
                    page?page:'',
                    limit?limit:99999999
                )
                .then(opinions=>{
                    return res.send({
                        'data': opinions,
                        'count': total
                    })
                })
                .catch(error=>{
                     return res.status(500).send({
                         'message': 'Imposible Mostrar',
                         'error': error
                     })
                })
                break;
            
            case 'neutral':
                total = await Opinion.count({ where: {campaign: camp_id, or:[
                    { polaridad: 'neutral' },
                    { polaridad: 'neutra' },
                    ]}})
                await Opinion.find({
                    where: {campaign: camp_id, or:[
                        { polaridad: 'neutral' },
                        { polaridad: 'neutra' },
                        ]}
                })
                .sort('fecha ASC')
                .populate('userend')
                .paginate(
                    page?page:'',
                    limit?limit:99999999
                )
                .then(opinions=>{
                    return res.send({
                        'data': opinions,
                        'count': total
                    })
                })
                .catch(error=>{
                        return res.status(500).send({
                            'message': 'Imposible Mostrar',
                            'error': error
                        })
                })
                break;
       
           default:
               break;
       }

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

    deleteOpinion:async (req,res)=>{
        const id = req.param('id');
        if(!id){return res.status(400).send({'error':'Id was provide'})}
        await Opinion.destroy({id:id})
        .then(opinion=>{
            return res.send({
                'data': opinion
            });
        })
        .catch(err => {
            return res.status(500).send({
                'message': 'Imposible Mostrar',
                'error': err
            })
        })
    },

    countAllOpinions: async (req,res)=>{
        await Opinion.count({})
        .then(total=>{
            return res.send({
                'result': total
            });
        })
        .catch(err => {
            return res.status(500).send({
                'message': 'Imposible Mostrar',
                'error': err
            })
        })
    },

    countOpinionsOfCampaign: async (req,res)=>{
        const camp_id= req.param('id');
        sails.log.debug(req.param('id'));
        sails.log.debug(camp_id);
        await Opinion.count({campaign:camp_id})
        .then(total=>{
            return res.send({
                'result': total
            });
        })
        .catch(err => {
            return res.status(500).send({
                'message': 'Imposible Mostrar',
                'error': err
            })
        })
        
    },

    getOpinionsAdvancedSearch:async (req,res)=>{
        const camp_id = req.param('id');
        const date_start = req.param('date_start');
        const date_end = req.param('date_end');
        const page = req.param('page');
        const limit  = Number(req.param('limit'));
        if(!camp_id){
            return res.status(400).send({
            'message': 'You Most Provide Campaign ID'
        });}
        if(Date.parse(date_start)>Date.parse(date_end)){
            return res.status(400).send({
                'message': 'Cannot set Date Start greater than Date End'
            });
        }
        let constraintsByAttrName = {
            campaign : camp_id?camp_id:undefined,
            userend: req.param('user_id')?req.param('user_id'):undefined,
            fecha: date_start&&date_end?
                    {'>=': date_start,'<=': date_end }:undefined,
            texto: req.param('text')?{contains: req.param('text') }:undefined,
            polaridad: req.param('polarity')?req.param('polarity'):undefined
          };
          _.each(_.keys(constraintsByAttrName), (attrName)=>{
            if (constraintsByAttrName[attrName] === undefined) {
              delete constraintsByAttrName[attrName];
            }
          });
        sails.log.debug(constraintsByAttrName);
        let total = await Opinion.count(constraintsByAttrName);
        await Opinion.find(constraintsByAttrName)
        .sort('fecha ASC')
        .populate('userend')
        .paginate(page?page:'', limit?limit:99999999)
        .then(opinions=>{
            return res.send({
                'data': opinions,
                'count': total
            })
        })
        .catch(error=>{
            return res.status(500).send({
                'message': 'Imposible Mostrar',
                'error': error
            })
    })


    }
}



