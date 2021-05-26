/**
 * EstadisticaByidiomaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment'); // require

module.exports = {

    
    getCantENXDia: async (req, res) => {
        let campaign
        let clientTimestamp = req.param('client_timestamp');
        let nlanguage = req.param('language');
        let id = req.param('id');

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
                        createDay: 'Tuesday',
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
                        createDay: 'Wednesday',
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
                        createDay: 'Thursday',
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
                        createDay: 'Friday',
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
                        createDay: 'Saturday',
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
                        createDay: 'Sunday',
                        idioma: 'ingles'
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

            })



    },


    //Requiere ID de la Campaña
    getCantESXDia: async (req, res) => {
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
                        createDay: 'Tuesday',
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
                        createDay: 'Wednesday',
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
                        createDay: 'Thursday',
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
                        createDay: 'Friday',
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
                        createDay: 'Saturday',
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
                        createDay: 'Sunday',
                        idioma: 'español'
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

    /**
     *  Count in a date (date parameters) the opinion
     *  size in campaingid identifier
     *
     */
    async getIntervalInDayData(campaignid, date, language) {

        let hourInDayInterval = [];
        console.log("In function by Interval")
        let cantDayResult = [];
        let initData = moment(date, "YYYY-MM-DD HH:mm a").hour(12).format("YYYY-MM-DD HH:mm a");

        //2- Find yesterday date
        hourInDayInterval.push(initData)
        console.log("Find yesterday date")

        //1- Compute all interval between init and interval
        let dateInMoment = aDate;
        for (var i = 0; i < intervalInHour; i++) {
            let dayForSearch = dateInMoment.add(2, 'hour').format("YYYY-MM-DD HH:mm a");
            hourInDayInterval.push(dayForSearch)
        }

        console.log("Compute all interval between init and interval")

        //3- Compute in parallel all opinion inner echa interval (today, yesterday)
        // var queryObj = {date: {'>=': begin, '<': end}};
        // Day.count(queryObj, newDay).exec(function(err, day) {
        //     console.log(day)
        // });

        console.log("Compute in parallel all opinion in each interval")
        await Promise.all(hourInDayInterval.map(async (item) => {
            console.log("<--- Execute query ---->||| <--- ")
            console.log(" Hour start ", item)
            let endMoment = moment(item, "YYYY-MM-DD HH:mm a").add(60, "minutes").format("YYYY-MM-DD HH:mm a")
            console.log(" Hour end ", endMoment)
            let opinion = await Opinion.count({
                campaign: campaignid,
                fecha: { '>=': item, '<': endMoment },
                idioma: 'ingles'
            });

            console.log("=== In these ===")
            console.log("Opinion sizes ", opinion, " in date ==> ", item);
            let resultObject = {
                opinionsize: (typeof (opinion) === 'undefined') ? 0 : opinion,
                date: item,
                dateName: moment(item, "YYYY-MM-DD HH:mm a").format('dddd')
            }
            console.log("Insert object in search ", resultObject);
            cantDayResult.push(resultObject)

        }));

        cantDayResult = cantDayResult.sort((a, b) => moment(a.date, "YYYY-MM-DD HH:mm a").diff(moment(b.date, "YYYY-MM-DD HH:mm a")))

        console.log("Data to send ", cantDayResult)
        return cantDayResult;

    },

    getIntervalInAday: async (req, res) => {


        let dayInterval = [{
            init: '12:00 AM',
            interval: 2
        },
        {
            end: '10:00 PM',
            interval: 2
        }]
        let initTime = '12:00 AM'
        let intervalInHour = 12;
        let campaign;
        let cantDay = [1, 2, 3, 4, 5, 6, 7];
        let cantDayResult = [];
        let clientTimestamp = req.param('client_timestamp');
        let nlanguage = req.param('language');


        if (typeof (nlanguage) === 'undefined' || nlanguage === '')
            nlanguage = 'ingles';

        //let temp = [221, 428, 492, 471, 413, 344, 294]
        console.log("Client time is : ", clientTimestamp)
        var aDate = moment(clientTimestamp, 'YYYY-MM-DD HH:mm a', true);

        let dateNewObjetc = new Date(clientTimestamp);
        if (!(aDate.isValid()) || typeof (clientTimestamp) === 'undefined') {
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

                        let todayAndYesterdayResult = []
                        let initData = aDate.hour(12).format("YYYY-MM-DD HH:mm a");

                        todayAndYesterdayResult.push({
                            'today': initData
                        })

                        console.log("<=== Create array by years ===>")
                        //2- Find yesterday date
                        let yesterDay = aDate.clone();
                        yesterDay = yesterDay.subtract(1, 'days');

                        todayAndYesterdayResult.push({
                            'yesterday': yesterDay.format("YYYY-MM-DD HH:mm a")
                        })

                        console.log("Find in parallel for today and yesterday")
                        await Promise.all(todayAndYesterdayResult.map(async (item) => {

                            console.log("<----  Find in ===> ", item)

                            var ndate = (typeof (item.today) === 'undefined') ? item.yesterday : item.today;
                            console.log(" Date is ", ndate)
                            let resultInDay = await sails.helpers.getIntervalInDayData.with({
                                camapingid: campaign.id,
                                date: ndate,
                                language: nlanguage
                            });

                            console.log("################################################")
                            if (typeof (item.today) !== "undefined")
                                cantDayResult.push({
                                    today: resultInDay
                                })
                            else
                                cantDayResult.push({
                                    yesterday: resultInDay
                                })

                        }))

                        console.log("Data to send ", cantDayResult.length)
                        let endResult = {
                            'date': aDate.format("YYYY-MM-DD HH:mm a"),
                            'data': cantDayResult,
                        }
                        console.log("En date to return ", endResult.date)
                        return res.send(endResult)

                    }
                })
                .catch(error => { })
        }
    }
}

