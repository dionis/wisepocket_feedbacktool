/**
 * EstadisticaByTipoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getCPostivaXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7, 8]
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        createDay: 'Monday',
                        polaridad: 'positiva'
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
                        createDay: 'Tuesday',
                        polaridad: 'positiva'
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
                        createDay: 'Wednesday',
                        polaridad: 'positiva'
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
                        createDay: 'Thursday',
                        polaridad: 'positiva'
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
                        createDay: 'Friday',
                        polaridad: 'positiva'
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
                        createDay: 'Saturday',
                        polaridad: 'positiva'
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
                        createDay: 'Sunday',
                        polaridad: 'positiva'
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        let sum = 0
                        for (let index = 0; index < 7; index++) {
                            sum = sum + cantDay[index]

                        }
                        cantDay[7] = sum
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

    getCNegativaXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7, 8]
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        createDay: 'Monday',
                        polaridad: 'negativa'
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
                        createDay: 'Tuesday',
                        polaridad: 'negativa'
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
                        createDay: 'Wednesday',
                        polaridad: 'negativa'
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
                        createDay: 'Thursday',
                        polaridad: 'negativa'
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
                        createDay: 'Friday',
                        polaridad: 'negativa'
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
                        createDay: 'Saturday',
                        polaridad: 'negativa'
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
                        createDay: 'Sunday',
                        polaridad: 'negativa'
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        let sum = 0
                        for (let index = 0; index < 7; index++) {
                            sum = sum + cantDay[index]

                        }
                        cantDay[7] = sum
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

    getCNeutraXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7, 8]
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        createDay: 'Monday',
                        polaridad: 'neutra'
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
                        createDay: 'Tuesday',
                        polaridad: 'neutra'
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
                        createDay: 'Wednesday',
                        polaridad: 'neutra'
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
                        createDay: 'Thursday',
                        polaridad: 'neutra'
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
                        createDay: 'Friday',
                        polaridad: 'neutra'
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
                        createDay: 'Saturday',
                        polaridad: 'neutra'
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
                        createDay: 'Sunday',
                        polaridad: 'neutra'
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        let sum = 0
                        for (let index = 0; index < 7; index++) {
                            sum = sum + cantDay[index]

                        }
                        cantDay[7] = sum
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
        let cantDay = [1, 2, 3, 4, 5, 6, 7, 8]
        let clientTimestamp = req.param('client_timestamp');
        await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {
                if (!doc) {
                    console.log("No encontrado")
                } else {
                    console.log("Encontrado"),
                        campaign = doc
                    await Opinion.count({
                        campaign: campaign.id,
                        createDay: 'Monday',
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
                        createDay: 'Tuesday',
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
                        createDay: 'Wednesday',
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
                        createDay: 'Thursday',
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
                        createDay: 'Friday',
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
                        createDay: 'Saturday',
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
                        createDay: 'Sunday',
                    }).then((opinion) => {
                        cantDay[6] = opinion
                        let sum = 0
                        for (let index = 0; index < 7; index++) {
                            sum = sum + cantDay[index]

                        }
                        cantDay[7] = sum
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


};

