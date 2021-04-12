import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../../../@fuse/animations';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';

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
    data: any;

    widget2: any = {
        negativaOpin: {
            value: 500,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'negativaOpin',
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
        positivaOpin: {
            value: 400,
            ofTarget: 0
        },
        chartType: 'bar',
        datasets: [
            {
                label: 'positivaOpin',
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
    

    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     * @param {EstadXidiomaService} _estadPrueba
     */
    constructor(
        //private _analyticsDashboardService: AnalyticsDashboardService,
        private _estadPrueba: EstadXidiomaService
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
        console.log("TO SEE DATA IN CHART");
        console.log("WIDGET 2");
        console.log("Datasets ", this.widget2.datasets[0].data)
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

