import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../../../@fuse/animations';

import { AnalyticsDateDashboardService } from '../analyticsbyDate/analyticsDate.service';
@Component({
    selector     : 'date-dashboard-analytics',
    templateUrl  : './analyticsDate.component.html',
    styleUrls    : ['./analyticsDate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsDateDashboardComponent implements OnInit
{
    widgets: any;
    widget1SelectedYear = '2016';
    widget5SelectedDay = 'today';

    /**
     * Constructor
     *
     * @param {AnalyticsDateDashboardService} _analyticsDateDashboardService
     */
    constructor(
        private _analyticsDateDashboardService: AnalyticsDateDashboardService
    )
    {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the widgets from the service
        this.widgets = this._analyticsDateDashboardService.widgets;


        console.log("TO SEE DATA IN CHART");
        console.log("WIDGET 5");
        console.log("Datasets ", this.widgets.widget5.datasets)
        console.log("-----------------------")
        console.log("labels ",  this.widgets.widget5.labels );
        console.log("-----------------------");
        console.log("colors ",  this.widgets.widget5.colors);
        console.log("-----------------------");
        console.log("options ",  this.widgets.widget5.options);
        console.log("-----------------------");
        console.log("charType ",  this.widgets.widget5.chartType);



    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void
    {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: function(chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function(dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if ( !meta.hidden )
                    {
                        meta.data.forEach(function(element, index): any {

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