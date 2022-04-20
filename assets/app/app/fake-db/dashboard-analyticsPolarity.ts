

export class AnalyticsPolarityDashboardDb {
    public static widgets = {
        widget2: {
            positiveOpin: {
                value: 0,
                ofTarget: 0
            },
            chartType: 'bar',
            datasets: [
                {
                    label: 'positiveOpin',
                    data: [] 
                }
            ],
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            colors: [
                {
                    borderColor: '#42a5f5',
                    backgroundColor: '#42a5f5'
                }
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 24,
                        left: 16,
                        right: 16,
                        bottom: 16
                    }
                },
                scales: {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 100,
                                max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget3: {
            negativeOpin: {
                value: '0',
                ofTarget: 0
            },
            chartType: 'bar',
            datasets: [
                {
                    label: 'negativeOpin',
                    data: [],
                    fill: false
                }
            ],
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            colors: [
                {
                    borderColor: '#5c84f1',
                    backgroundColor: '#42a5f5'
                }
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 2,
                        borderWidth: 1,
                        hoverRadius: 2,
                        hoverBorderWidth: 1
                    },
                    line: {
                        tension: 0
                    }
                },
                layout: {
                    padding: {
                        top: 24,
                        left: 16,
                        right: 16,
                        bottom: 16
                    }
                },
                scales: {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                // min: 100,
                                // max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget4: {
            totalOpin: {
                value: 0,
                ofTarget: 0
            },
            chartType: 'bar',
            datasets: [
                {
                    label: 'totalOpin',
                    data: []
                }
            ],
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            colors: [
                {
                    borderColor: '#f44336',
                    backgroundColor: '#f44336'
                }
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 24,
                        left: 16,
                        right: 16,
                        bottom: 16
                    }
                },
                scales: {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                min: 150,
                                max: 500
                            }
                        }
                    ]
                }
            }
        },
        widget5: {
            chartType: 'line',
            datasets: {
                'yesterday': [
                    {
                        label: 'Positiva',
                        data: [],
                        fill: 'start'

                    },
                    {
                        label: 'Negativa',
                        data: [],
                        fill: 'start'
                    }
                ],
                'today': [
                    {
                        label: 'Positiva',
                        data: [],
                        fill: 'start'
                    },
                    {
                        label: 'Negativa',
                        data: [],
                        fill: 'start'

                    }
                ]
            },
            labels: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
            colors: [
                {
                    borderColor: '#3949ab',
                    backgroundColor: '#3949ab',
                    pointBackgroundColor: '#3949ab',
                    pointHoverBackgroundColor: '#3949ab',
                    pointBorderColor: '#ffffff',
                    pointHoverBorderColor: '#ffffff'
                },
                {
                    borderColor: 'rgba(30, 136, 229, 0.87)',
                    backgroundColor: 'rgba(30, 136, 229, 0.87)',
                    pointBackgroundColor: 'rgba(30, 136, 229, 0.87)',
                    pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
                    pointBorderColor: '#ffffff',
                    pointHoverBorderColor: '#ffffff'
                }
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                tooltips: {
                    position: 'nearest',
                    mode: 'index',
                    intersect: false
                },
                layout: {
                    padding: {
                        left: 24,
                        right: 32
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        borderWidth: 2,
                        hoverRadius: 4,
                        hoverBorderWidth: 2
                    }
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'rgba(0,0,0,0.54)'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                tickMarkLength: 16
                            },
                            ticks: {
                                stepSize: 1000
                            }
                        }
                    ]
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                }
            }
        },
    };
}
