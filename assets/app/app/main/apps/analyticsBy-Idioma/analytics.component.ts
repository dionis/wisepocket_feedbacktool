import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '../../../../@fuse/animations';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';
import { CampaignService } from '../../../services/campaign.service';
import { UserService } from '../../../services/user.service';
import { takeUntil } from 'rxjs/operators';
//import { AnalyticsDashboardService } from './analytics.service';

@Component({
    selector: 'analytics-dashboard',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit, OnDestroy {
    //widgets: any;
    widget5SelectedDay = 'Ayer';
    data: any;
    campaigns: any;
    usertime:any;

    // Private
    private _unsubscribeAll: Subject<any>;

    widget2: any = {
        englishOpin: {
            value: 500,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Cantidad',
                data: []
            }
        ],
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        colors: [
            {
                borderColor: '#00008b',
                backgroundColor: '#00008b'
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
                        display: false
                    }
                ]
            }
        }
    }
    widget3: any = {
        spanishOpin: {
            value: 500,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'Cantidad',
                data: []
            }
        ],
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
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
                        display: false
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
                label: 'Cantidad',
                data: []
            }
        ],
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
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
                        display: false
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
                    label: 'Inglés',
                    data: [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
                    fill: 'start'

                },
                {
                    label: 'Español',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                }
            ],
            'Hoy': [
                {
                    label: 'Inglés',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                },
                {
                    label: 'Español',
                    data: [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
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
    }

    temp: any;
    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     * @param {EstadXidiomaService} _estadPrueba
     */
    constructor(
        //private _analyticsDashboardService: AnalyticsDashboardService,
        private _estadPrueba: EstadXidiomaService,
        private _camapignService: CampaignService,
        private _userService: UserService
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
        // Set the private defaults
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
        ///Actualizar los datos de una de
        ///las camapanas

        /// En proximas versiones se obtendra el
        ///identificador de una campama

        //Por ahora se toma una campana aleatoria
        //de la lista de campana que se carga en
        ///_camapignService.campaign

        //DATEPICKER BIBLIOGRAFY:
        //https://material.angular.io/components/datepicker/overview

        let currentCamapingId: string = "";
        console.log(" Get information about USER ", this._userService.user.id);
        this._camapignService.getCampaignbyUser(this._userService.user.id);

        if (typeof (this._camapignService.campaign) !== 'undefined' && this._camapignService.campaign.length > 0) {
            //Selecciona el id de la campana escogida por el usuario
            let camapIgnObjet = this._camapignService.campaign;
            
            console.log("Campaign ID", this._camapignService.getCampaignId)
            console.log("Campaingn list ", this._camapignService.campaign);

            currentCamapingId = camapIgnObjet.getCampaignId;
            this._estadPrueba.setCurrentCamaignId(currentCamapingId);
        }


        ///Read all Stadistics
        this._estadPrueba.getAllStadistics()
           .pipe(takeUntil(this._unsubscribeAll))
           .subscribe(([englishData, spanishData, allData]) => {
              console.log("<--- Get my data Spanish ---> ", spanishData);
              this.widget3.datasets[0].data = spanishData;
              console.log("<--- Get my data English ---> ", englishData);
              this.widget2.datasets[0].data = englishData;
              console.log("<--- Get my data All ---> ", allData);
              this.widget4.datasets[0].data = allData;

           })
        /// Widget 2 Data
        // this._estadPrueba.getDataEn().pipe(takeUntil(this._unsubscribeAll)).subscribe(newdata => {
        //     console.log("<--- Get my data ---> ", newdata);
        //     this.widget2.datasets[0].data = newdata;
        // })
        // /// Widget 3 Data
        // this._estadPrueba.getDataEs().pipe(takeUntil(this._unsubscribeAll)).subscribe(newdata => {
        //     console.log("<--- Get my data ---> ", newdata);
        //     this.widget3.datasets[0].data = newdata;
        // })
        // /// Widget 4 Data
        // this._estadPrueba.getDataTotal().pipe(takeUntil(this._unsubscribeAll)).subscribe(newdata => {
        //     console.log("<--- Get my data ---> ", newdata);
        //     this.widget4.datasets[0].data = newdata;
        // })
        this.campaigns = this._camapignService.getMyCamps();
        console.log(this.campaigns);

        /*console.log("TO SEE DATA IN CHART");
        console.log("WIDGET 5");
        console.log("Datasets ", this.widget2.datasets[0].data)
        console.log("-----------------------")
        console.log("labels ", this.widget5.labels);
        console.log("-----------------------");
        console.log("colors ", this.widget5.colors);
        console.log("-----------------------");
        console.log("options ", this.widget5.options);
        console.log("-----------------------");
        console.log("charType ", this.widget5.chartType);*/
        //this.widgets = this._analyticsDashboardService.widgets;

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


    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

