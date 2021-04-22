import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';

import { fuseAnimations } from '../../../../@fuse/animations';
import { AnalyticsPolarityDashboardService } from '../analyticsbyPolarity/analyticsPolarity.service'

//import { EstadXidiomaService } from '../../../services/estad-xidioma.service';
//import { AnalyticsDashboardService } from './analytics.service';

@Component({
    selector: 'polarity-dashboard-analytics',
    templateUrl: './analyticsPolarity.component.html',
    styleUrls: ['./analyticsPolarity.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsPolarityDashboardComponent implements OnInit {
    widgets: any;
    widget5SelectedDay = 'Ayer';
    data: any;

    widget2: any = {
        positiveOpin: {
            value: 500,
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
    }
    widget3: any = {
        negativeOpin: {
            value: 400,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'negativeOpin',
                data: [221, 428, 492, 471, 413, 344, 294],
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
    }
    widget4: any = {
        totalOpin: {
            value: 600,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'totalOpin',
                data: [221, 428, 492, 471, 413, 344, 294]
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
                    label: 'Positivo',
                    data: [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
                    fill: 'start'

                },
                {
                    label: 'Negativo',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                }
            ],
            'Hoy': [
                {
                    label: 'Positivo',
                    data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                    fill: 'start'
                },
                {
                    label: 'Negativo',
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

    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     * @param {AnalyticsPolarityDashboardService} _estadPrueba
     */
    constructor(
        //private _analyticsDashboardService: AnalyticsDashboardService,
        private _estadPrueba: AnalyticsPolarityDashboardService
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the widgets from the service
        this.widgets = this._estadPrueba.widgets;

        //console.log(this._estadPrueba.getDataEn());
        //this.widget2.datasets[0].data = this._estadPrueba.getDataEn();

        console.log("TO SEE DATA IN CHART");
        console.log("WIDGET 5");
        console.log("Datasets ", this.widget2.datasets[0].data)
        console.log("-----------------------")
        console.log("labels ", this.widget5.labels);
        console.log("-----------------------");
        console.log("colors ", this.widget5.colors);
        console.log("-----------------------");
        console.log("options ", this.widget5.options);
        console.log("-----------------------");
        console.log("charType ", this.widget5.chartType);
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
}
