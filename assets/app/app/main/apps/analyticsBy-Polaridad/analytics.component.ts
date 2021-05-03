import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../../../@fuse/animations';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';
import { CampaignService } from '../../../services/campaign.service';
import { UserService } from '../../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


import * as moment from 'moment';
//import { AnalyticsDashboardService } from './analytics.service';

@Component({
    selector: 'analytics-dashboard',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit {
    //widgets: any;
    widget5SelectedDay = 'Ayer';
    data: any;
    campaign:any;
    usertime:any;
    private _unsubscribeAll: Subject<any>;

    widget2: any = {
        negativaOpin: {
            value: 500,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Opiniones Negativas',
                data: []
                // data: [281, 468, 490, 371, 480, 44, 194],
                // fill: false
            }
        ],
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        colors: [
            {
                borderColor: '#2de000',
                backgroundColor: '#2de000'
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
    }
    widget3: any = {
        positivaOpin: {
            value: 400,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Opiniones Positivas',
                data: []
                // data: [221, 428, 492, 471, 413, 344, 294],
                // fill: false
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
    }
    widget4: any = {
        totalOpin: {
            value: 600,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Total de Opiniones',
                // data: [271, 408, 494, 471, 413, 344, 294]
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
    }

    widget5: any = {
        chartType: 'line',
        datasets: {
            'Ayer': [
                {
                    label: 'Neutras',
                    data: [1900, 1300, 3400, 2200, 2900, 390, 1500, 380, 4000, 1380, 1320, 2290],
                    fill: 'start'

                },
                {
                    label: 'Positivas',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                },
                {
                    label: 'Negativas',
                    data: [1000, 1000, 3000, 2700, 3500, 1500, 2100, 500, 2000, 1000, 5000, 2000, 3000],
                    fill: 'start'
                }
            ],
            'Hoy': [
                {
                    label: 'Positivas',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                },
                {
                    label: 'Negativas',
                    data: [1000, 3000, 2700, 3500, 1500, 2100, 500, 2000, 1000, 5000, 2000, 3000],
                    fill: 'start'

                },
                {
                    label: 'Neutras',
                    data: [1900, 1300, 3400, 2200, 2900, 390, 500, 200, 2500, 300, 450, 2000],
                    fill: 'start'
                }
            ]
        },
        labels: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
        colors: [
            {
                borderColor: '#cc72f0',
                backgroundColor: '#cc72f0',
                pointBackgroundColor: '#cc72f0',
                pointHoverBackgroundColor: '#cc72f0',
                pointBorderColor: '#ffffff',
                pointHoverBorderColor: '#ffffff'
            },
            {
                borderColor: '#0fd1eb',
                backgroundColor: '#0fd1eb',
                pointBackgroundColor: '#0fd1eb',
                pointHoverBackgroundColor: '#0fd1eb',
                pointBorderColor: '#ffffff',
                pointHoverBorderColor: '#ffffff'
            },
            {
                borderColor: '#0feb8f',
                backgroundColor: '#0feb8f',
                pointBackgroundColor: '#0feb8f',
                pointHoverBackgroundColor: '#0feb8f',
                pointBorderColor: '#ffffff',
                pointHoverBorderColor: '#ffffff'
            },
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
    }

    widget6: any = {
        positivaOpin: {
            value: 200,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Opiniones Neutrales',
                // data: [221, 428, 492, 471, 413, 344, 294],
                // fill: false
                data: []
            }
        ],
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        colors: [
            {
                borderColor: '#6e076e',
                backgroundColor: '#6e076e'
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
    }

    maxDate: Date;
    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     * @param {EstadXidiomaService} _estadPrueba
     */
    constructor(
        //private _analyticsDashboardService: AnalyticsDashboardService,
        private _estadPrueba: EstadXidiomaService,
        private _campaignService :CampaignService,
        private _userService: UserService
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();

        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the widgets from the service
        console.log("TO SEE DATA IN CHART");
        console.log("WIDGET 2");
        console.log("Datasets ", this.widget2.datasets[0].data)
        //this.widgets = this._analyticsDashboardService.widgets;

        let currentCamapingId: string = "";
        console.log(" Get information about USER ", this._userService.user.id);
        this._campaignService.getCampaignbyUser(this._userService.user.id);

        if (typeof (this._campaignService.campaign) !== 'undefined' && this._campaignService.campaign.length > 0) {
            //Selecciona el id de la capana escogida por el usuario
            let camapIgnObjet = this._campaignService.campaign;

            console.log("Campaign ID", this._campaignService.getCampaignId)
            console.log("Campaingn list ", this._campaignService.campaign);

            currentCamapingId = camapIgnObjet.getCampaignId;
            this._estadPrueba.setCurrentCamaignId(currentCamapingId);
        }


        let currentDate =  moment().format("YYYY-MM-DD HH:mm a");

        this.getAllStadisticsFromBackend(currentDate);

                ///Read all Stadistics
                // this._estadPrueba.getAllStadistics()
                // .pipe(takeUntil(this._unsubscribeAll))
                // .subscribe(([ positiveData, negativeData, neutralData, allData]) => {
                //    console.log("<--- Get my data Positive ---> ", positiveData);
                //    this.widget3.datasets[0].data = positiveData;
                //    console.log("<--- Get my data Negative ---> ", negativeData);
                //    this.widget2.datasets[0].data = negativeData;
                //    console.log("<--- Get my data Neutral ---> ", neutralData);
                //    this.widget6.datasets[0].data = neutralData;
                //    console.log("<--- Get my data All ---> ", allData);
                //    this.widget4.datasets[0].data = allData;

                // })

        this.campaign = this._campaignService.getMyCamps();
        console.log(this.campaign);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index): any {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (window as any).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }


    getAllStadisticsFromBackend(currentDate:string){

      this._estadPrueba.getAllStadistics(currentDate)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([englishData, spanishData, allData, byIntervalData]) => {
         console.log("<--- Get my data Spanish ---> ", spanishData);
         this.widget3.datasets[0].data = spanishData;
         console.log("<--- Get my data English ---> ", englishData);
         this.widget2.datasets[0].data = englishData;
         console.log("<--- Get my data All ---> ", allData);
         this.widget4.datasets[0].data = allData;

      })

    }

         /* Date */
    date(eDate) {
          // var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
          var convertDate = new Date(eDate.target.value)
          let currentDate =  moment(convertDate).format("YYYY-MM-DD HH:mm a");
          console.log("Find statdistics to ", currentDate);

          this.getAllStadisticsFromBackend(currentDate);

    }
}

