/**
 * EstadisticaByTipoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getCPostivaXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
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
                        fecha: 'Tuesday',
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
                        fecha: 'Wednesday',
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
                        fecha: 'Thursday',
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
                        fecha: 'Friday',
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
                        fecha: 'Saturday',
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
                        fecha: 'Sunday',
                        polaridad: 'positiva'
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

    getCNegativaXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
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
                        fecha: 'Tuesday',
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
                        fecha: 'Wednesday',
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
                        fecha: 'Thursday',
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
                        fecha: 'Friday',
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
                        fecha: 'Saturday',
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
                        fecha: 'Sunday',
                        polaridad: 'negativa'
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

    getCNeutraXDia: async (req, res) => {
        let campaign
        let cantDay = [1, 2, 3, 4, 5, 6, 7]
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
                        fecha: 'Tuesday',
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
                        fecha: 'Wednesday',
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
                        fecha: 'Thursday',
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
                        fecha: 'Friday',
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
                        fecha: 'Saturday',
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
                        fecha: 'Sunday',
                        polaridad: 'neutra'
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
          },

    
};

