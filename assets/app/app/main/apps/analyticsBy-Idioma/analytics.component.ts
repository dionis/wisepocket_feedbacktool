import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '../../../../@fuse/animations';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';
import { CampaignService } from '../../../services/campaign.service';
import { UserService } from '../../../services/user.service';
import { takeUntil } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SharedVariablesService } from '../../../services/shared-variables.service';
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
    usertime: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    widget2: any = {
        englishOpin: [{
            value: [0]
        }],
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
        spanishOpin: [{
            value: [0]
        }],
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
        totalOpin: [{
            value: [0]
        }],
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

    dateForm: FormGroup;
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
        private _camapignService: CampaignService,
        private _userService: UserService,
        private servCamp: SharedVariablesService,
        private _fb: FormBuilder
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.maxDate = new Date();

        /*
        <mat-form-field class="example-full-width" appearance="fill">
          <mat-label>Choose a date</mat-label>
          <input matInput [min]="minDate" [max]="maxDate" [matDatepicker]="picker">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
         OOOOOOOJJJJJJOOOOOOOO
         minDate find the start camapingDate
       */

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

        //let currentCamapingId: string = "";
        //console.log(" Get information about USER ", this._userService.user.id);
       // this._camapignService.getCampaignbyUser('0', '', '', '');


        if (this.servCamp.getName() != '') {

            console.log("CampNAme " + this.servCamp.getName());

            this.campaigns = this.servCamp.getName();
            console.log(this.campaigns);

            let currentDate = moment().format("YYYY-MM-DD hh:mm a");

            this.getAllStadisticsFromBackend(currentDate);

            //Selecciona el id de la campana escogida por el usuario
            /*************************************************
               ERASE IN PRODUCTION
            **************************************************/
            /*this._camapignService.testSelectedRandomCamaping()
                .then((_) => {
                    const camapIgnObjet = this._camapignService.selectedCampaign;

                    console.log("Campaign ID", camapIgnObjet)
                    console.log("Campaingn list ", this._camapignService.campaign);

                    currentCamapingId = camapIgnObjet.id;
                    this._estadPrueba.setCurrentCamaignId(currentCamapingId);*/


        }
        /*.catch (error => console.error(error))
console.log("Sali  D IF NGONIT");*/




        ///Read all Stadistics


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

        this.dateForm = this._fb.group({
            usertime: ['']
        });


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

    /* Date */
    date(eDate) {
        // var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
        var convertDate = new Date(eDate.target.value)
        let currentDate = moment(convertDate).format("YYYY-MM-DD hh:mm a");
        console.log("Find statdistics to ", currentDate);

        this.getAllStadisticsFromBackend(currentDate);

    }


    getAllStadisticsFromBackend(currentDate: string) {

        this._estadPrueba.getAllStadistics(currentDate)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([englishData, spanishData, allData, byIntervalDataEnglish, byIntervalDataSpanish]) => {
                console.log("<--- Get my data English ---> ", englishData);
                this.widget2.englishOpin[0].value = englishData.data[7];
                this.widget2.datasets[0].data = englishData.data;
                console.log("<--- Get my data Spanish ---> ", spanishData);
                this.widget3.spanishOpin[0].value = spanishData.data[7];
                this.widget3.datasets[0].data = spanishData.data;
                console.log("<--- Get my data All ---> ", allData);
                this.widget4.totalOpin[0].value = allData.data[7];
                this.widget4.datasets[0].data = allData.data;
                console.log("<--- Get my data in Interval  English---> ", byIntervalDataEnglish[0]);
                console.log("<--- Get my data in Interval  Spanish---> ", byIntervalDataSpanish[0]);


                let labelsTime: any = [];

                let spanishToday: any = [];
                let spanishYesterday: any = [];

                let englishToday: any = [];
                let englishYesterday: any = [];

                ///Get labels
                if (typeof (byIntervalDataEnglish[0]) !== 'undefined') {
                    byIntervalDataEnglish.forEach(element => {

                        if (typeof (element.today) !== 'undefined') {

                            element.today.forEach(item => {
                                labelsTime.push(item.dateHour);
                                englishToday.push(parseInt(item.opinionsize, 10));
                            })

                            console.log("New list of labels ", labelsTime);
                            this.widget5.labels = labelsTime;

                            if (this.widget5.datasets['Hoy'][0].label == "Inglés") {
                                this.widget5.datasets['Hoy'][0].data = englishToday;
                                console.log("Search data for English today ", this.widget5.datasets['Hoy'][0].data);
                            }

                        }


                        if (typeof (element.yesterday) !== 'undefined') {

                            element.yesterday.forEach(item => {
                                englishYesterday.push(parseInt(item.opinionsize, 10));
                            })

                            if (this.widget5.datasets['Ayer'][0].label == "Inglés") {
                                this.widget5.datasets['Ayer'][0].data = englishYesterday;
                                console.log("Search data for English yesterday ", this.widget5.datasets['Ayer'][0].data);

                            }
                        }

                    });

                }


                if (typeof (byIntervalDataSpanish) !== 'undefined') {
                    byIntervalDataEnglish.forEach(element => {
                        if (typeof (element.today) !== 'undefined') {

                            element.today.forEach(item => {
                                spanishToday.push(parseInt(item.opinionsize, 10));
                            })

                            if (this.widget5.datasets['Hoy'][1].label == "Español") {
                                this.widget5.datasets['Hoy'][1].data = spanishToday;
                                console.log("Search data for Spanish today ", this.widget5.datasets['Hoy'][1].data);
                            }

                        }


                        if (typeof (element.yesterday) !== 'undefined') {

                            element.yesterday.forEach(item => {
                                spanishYesterday.push(parseInt(item.opinionsize, 10));
                            })


                            if (this.widget5.datasets['Ayer'][1].label == "Español") {
                                this.widget5.datasets['Ayer'][1].data = spanishYesterday;
                                console.log("Search data for Spanish yesterday ", this.widget5.datasets['Ayer'][1].data);
                            }
                        }
                    })
                }



            })

    }
}

