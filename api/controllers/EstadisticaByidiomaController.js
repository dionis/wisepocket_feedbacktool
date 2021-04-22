/**
 * EstadisticaByidiomaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    //Requiere ID de la Campaña

    getNameDay(s) {
        var date = s
        console.log('FakerDateBase:' + date);
        var fecha = Date.parse(String(date));
        console.log('NameDay:' + new Date(fecha).toLocaleString('en-US', { weekday: 'long' }));
        return String(fecha);
    },

    searchOpinion: async () => {
     
     await Opinion.find({ 
        }).then((docs) => {
            return docs
        }).catch((err) => {
            console.log(`Error: ` + err)
        })
    },
    

    getCantENXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
        let clientTimestamp =  req.param('client_timestamp');
        //let temp = [221, 428, 492, 471, 413, 344, 294]
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Monday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[0] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Tuesday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[1] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Wednesday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[2] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Thursday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[3] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Friday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[4] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Saturday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[5] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Sunday',
                        idioma: 'ingles'
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        return res.send({
                            'data': cantDay,
                        })
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                }

            })



    },

    //Requiere ID de la Campaña
    getCantESXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
        let clientTimestamp =  req.param('client_timestamp');
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Monday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[0] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Tuesday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[1] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Wednesday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[2] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Thursday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[3] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Friday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[4] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Saturday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[5] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Sunday',
                        idioma: 'español'
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        return res.send({
                            'data': cantDay,
                        })
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                }

            }
            )
    },

    //Requiere ID de la Campaña
    getCantTotalXDia: async (req, res) => {

      ///Compute all element in a array (summ all)
      ///Bibliografy: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

          // const array1 = [1, 2, 3, 4];
          // const reducer = (accumulator, currentValue) => accumulator + currentValue;

          // // 1 + 2 + 3 + 4
          // console.log(array1.reduce(reducer));
          // // expected output: 10

          // // 5 + 1 + 2 + 3 + 4
          // console.log(array1.reduce(reducer, 5));
          // // expected output: 15

        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
        let clientTimestamp =  req.param('client_timestamp');
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Monday',
                    }).then((opinion) => {
                        cantDay[0] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Tuesday',
                    }).then((opinion) => {
                        cantDay[1] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Wednesday',
                    }).then((opinion) => {
                        cantDay[2] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Thursday',
                    }).then((opinion) => {
                        cantDay[3] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Friday',
                    }).then((opinion) => {
                        cantDay[4] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Saturday',
                    }).then((opinion) => {
                        cantDay[5] = opinion
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                    await Opinion.count({
                        campaign: campaign.id,
                        fecha: 'Sunday',
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        return res.send({
                            'data': cantDay,
                        })
                    })
                        .catch(err => {
                            return res.status(500).send({
                                'message': 'Imposible Mostrar',
                                'error': err
                            })
                        })
                }

            }
            )
    }
}

