/**
 * EstadisticaByidiomaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment'); // require

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


    getCantENXDiaEx: async (req, res) => {
        let campaign;
        let cantDay = [1, 2, 3, 4, 5, 6, 7];
        let cantDayResult = [];
        let clientTimestamp =  req.param('client_timestamp');
        //let temp = [221, 428, 492, 471, 413, 344, 294]
        console.log("Client time is : ", clientTimestamp)
        var aDate  = moment(clientTimestamp, 'YYYY-MM-DD', true);

        let dateNewObjetc = new Date(clientTimestamp);
        if ( !(aDate.isValid()) || typeof(clientTimestamp) === 'undefined') {
             ///Error not a date from user client
             console.log("Client not send a current time ");

             return res.status(500).send({
              'message': 'Not exist data Client not send a current time',
              'error': 'Not exist data Client not send a current time'
            })
        }
        else {
            ///Find day of week since client timestamp
            await Campaign.findOne({ id: req.param('id') })
            .then(async (doc) => {

              if (!doc) {
                 console.log("Campaing's id not find out");
                 return res.status(500).send({
                   'message': 'Not exist data in this campaing',
                   'error': err
                 })
              }
              else {
                  campaign = doc;
                  let dayInTheWeek = [];
                  let dateInMoment = aDate;
                  //First current day
                  console.log("Insert date to search: ", dateInMoment.format("YYYY-MM-DD"));
                  dayInTheWeek.push(dateInMoment.format("YYYY-MM-DD"));
                  cantDay.forEach( item =>{
                    console.log("Numbers of day ", item)
                    var initialDate = dateInMoment.clone();
                    let dayForSearch = initialDate.subtract(item, 'days').format("YYYY-MM-DD");
                    //console.log(" Substrac " ,dateInMoment.format("DD-MM-YYYY") , " - " , item )
                    console.log("Insert date to search: ==> ", dayForSearch);
                    dayInTheWeek.push(dayForSearch);

                  })

                   ///For each day find in Data Base
                   //Bibliografy: Call syncronize
                   //https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/


                   await Promise.all(dayInTheWeek.map(async (item) => {
                        console.log("<--- Execute query ---->")
                        let opinion =  await Opinion.count({
                                  campaign: campaign.id,
                                  fecha: item,
                                  idioma: 'ingles'
                        });

                          console.log("=== In these ===")
                          console.log("Opinion sizes ", opinion, " in date ==> ", item );
                          let resultObject = {
                            opinionsize:(typeof(opinion) === 'undefined')?0:opinion,
                            date:item,
                            dateName: moment(item).format('dddd')
                          }
                          console.log("Insert object in search ",resultObject );
                          cantDayResult.push(resultObject )

                  }));

                   cantDayResult = cantDayResult.sort((a, b) =>moment(a.date).diff(moment(b.date)))

                    console.log("Data to send ", cantDayResult)
                    return res.send({
                      'data': cantDayResult,
                    })
                }

            })

          }

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
    },

 /**
  *  Count in a date (date parameters) the opinion
  *  size in campaingid identifier
  *
  */
     getIntervalInDayData: async (campaignid, date) => {

                             let hourInDayInterval = [];

                             let cantDayResult = [];
                             let initData = date.hour(12).format("YYYY-MM-DD HH:mm a");

                             //2- Find yesterday date
                             hourInDayInterval.push(initData)

                              //1- Compute all interval between init and interval
                              let dateInMoment = aDate;
                              for ( var i = 0; i < intervalInHour; i++ ){
                                 let dayForSearch = dateInMoment.add(2, 'hour').format("YYYY-MM-DD HH:mm a");
                                 hourInDayInterval.push(dayForSearch)
                              }

                              //3- Compute in parallel all opinion inner echa interval (today, yesterday)
                              // var queryObj = {date: {'>=': begin, '<': end}};
                              // Day.count(queryObj, newDay).exec(function(err, day) {
                              //     console.log(day)
                              // });

                              await Promise.all(hourInDayInterval.map(async (item) => {
                                console.log("<--- Execute query ---->||| <--- ")
                                console.log(" Hour start ", item)
                                let endMoment = moment(item,"YYYY-MM-DD HH:mm a").add(60,"minutes").format("YYYY-MM-DD HH:mm a")
                                console.log(" Hour end ", endMoment)
                                let opinion =  await Opinion.count({
                                          campaign: campaignid,
                                          fecha:  {'>=': item, '<': endMoment},
                                          idioma: 'ingles'
                                });

                                  console.log("=== In these ===")
                                  console.log("Opinion sizes ", opinion, " in date ==> ", item );
                                  let resultObject = {
                                    opinionsize:(typeof(opinion) === 'undefined')?0:opinion,
                                    date:item,
                                    dateName: moment(item,"YYYY-MM-DD HH:mm a").format('dddd')
                                  }
                                  console.log("Insert object in search ",resultObject );
                                  cantDayResult.push(resultObject )

                          }));

                           cantDayResult = cantDayResult.sort((a, b) =>moment(a.date,"YYYY-MM-DD HH:mm a").diff(moment(b.date,"YYYY-MM-DD HH:mm a")))

                            console.log("Data to send ", cantDayResult)
                          return {
                              'data': cantDayResult,
                            }

    },

    getIntervalInADay:async (req, res)=>{


        let dayInterval = [{init:'12:00 AM',
                            interval:2},
                            {
                            end:'10:00 PM',
                              interval:2
                            }]
        let initTime = '12:00 AM'
        let intervalInHour = 12;
        let campaign;
        let cantDay = [1, 2, 3, 4, 5, 6, 7];
        let cantDayResult = [];
        let clientTimestamp =  req.param('client_timestamp');

        //let temp = [221, 428, 492, 471, 413, 344, 294]
        console.log("Client time is : ", clientTimestamp)
        var aDate  = moment(clientTimestamp, 'YYYY-MM-DD', true);

        let dateNewObjetc = new Date(clientTimestamp);
        if ( !(aDate.isValid()) || typeof(clientTimestamp) === 'undefined') {
                ///Error not a date from user client
                console.log("Client not send a current time ");

                return res.status(500).send({
                                  'message': 'Not exist data Client not send a current time',
                                  'error': 'Not exist data Client not send a current time'
                      })
        }
        else {
                ///Find day of week since client timestamp
                await Campaign.findOne({ id: req.param('id') })
                    .then(async (doc) => {

                        if (!doc) {
                            console.log("Campaing's id not find out");
                            return res.status(500).send({
                                'message': 'Not exist data in this campaing',
                                 'error': err
                                })
                        }
                        else {
                             campaign = doc;
                             let hourInDayInterval = [];
                             let hourInYesterdayInterval = [];
                             let cantDayResult = [];
                             let initData = aDate.hour(12).format("YYYY-MM-DD HH:mm a");

                             //2- Find yesterday date
                             let yesterDay = aDate.clone();
                             yesterDay = yesterDay.subtract(1,'days');

                             hourInDayInterval.push(initData)
                             hourInYesterdayInterval.push(yesterDay);
                              //1- Compute all interval between init and interval
                              let dateInMoment = aDate;
                              for ( var i = 0; i < intervalInHour; i++ ){
                                 let dayForSearch = dateInMoment.add(2, 'hour').format("YYYY-MM-DD HH:mm a");
                                 hourInDayInterval.push(dayForSearch)
                              }

                              dateInMoment = yesterDay;
                              for ( var i = 0; i < intervalInHour; i++ ){
                                let dayYesterdaySearch = dateInMoment.add(2, 'hour').format("YYYY-MM-DD HH:mm a");
                                hourInYesterdayInterval.push(dayYesterdaySearch)
                             }




                              //3- Compute in parallel all opinion inner echa interval (today, yesterday)
                              // var queryObj = {date: {'>=': begin, '<': end}};
                              // Day.count(queryObj, newDay).exec(function(err, day) {
                              //     console.log(day)
                              // });

                              await Promise.all(hourInDayInterval.map(async (item) => {
                                console.log("<--- Execute query ---->||| <--- ")
                                console.log(" Hour start ", item)
                                let endMoment = moment(item,"YYYY-MM-DD HH:mm a").add(60,"minutes").format("YYYY-MM-DD HH:mm a")
                                console.log(" Hour end ", endMoment)
                                let opinion =  await Opinion.count({
                                          campaign: campaign.id,
                                          fecha:  {'>=': item, '<': endMoment},
                                          idioma: 'ingles'
                                });

                                  console.log("=== In these ===")
                                  console.log("Opinion sizes ", opinion, " in date ==> ", item );
                                  let resultObject = {
                                    opinionsize:(typeof(opinion) === 'undefined')?0:opinion,
                                    date:item,
                                    dateName: moment(item,"YYYY-MM-DD HH:mm a").format('dddd')
                                  }
                                  console.log("Insert object in search ",resultObject );
                                  cantDayResult.push(resultObject )

                          }));

                           cantDayResult = cantDayResult.sort((a, b) =>moment(a.date,"YYYY-MM-DD HH:mm a").diff(moment(b.date,"YYYY-MM-DD HH:mm a")))

                            console.log("Data to send ", cantDayResult)
                            return res.send({
                              'data': cantDayResult,
                            })

                         }
                     })
                    .catch(error=>{})
        }
    }
}

