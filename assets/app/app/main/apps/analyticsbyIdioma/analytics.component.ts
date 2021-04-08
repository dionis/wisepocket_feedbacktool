import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../../../@fuse/animations';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';

import { AnalyticsDashboardService } from './analytics.service';

@Component({
    selector     : 'analytics-dashboard',
    templateUrl  : './analytics.component.html',
    styleUrls    : ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit
{
    widgets: any;
    widget5SelectedDay = 'Ayer';
    data: any;

    ///Only with Test propouse

    widget5:any = {
      chartType: 'line',
      datasets : {
          'Ayer': [
              {
                  label: 'Visitors',
                  data : [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
                  fill : 'start'

              },
              {
                  label: 'Page views',
                  data : [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                  fill : 'start'
              }
          ],
          'Hoy'    : [
              {
                  label: 'Visitors',
                  data : [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220, 290],
                  fill : 'start'
              },
              {
                  label: 'Page Views',
                  data : [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
                  fill : 'start'

              }
          ]
      },
      labels   : ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
      colors   : [
          {
              borderColor              : '#3949ab',
              backgroundColor          : '#3949ab',
              pointBackgroundColor     : '#3949ab',
              pointHoverBackgroundColor: '#3949ab',
              pointBorderColor         : '#ffffff',
              pointHoverBorderColor    : '#ffffff'
          },
          {
              borderColor              : 'rgba(30, 136, 229, 0.87)',
              backgroundColor          : 'rgba(30, 136, 229, 0.87)',
              pointBackgroundColor     : 'rgba(30, 136, 229, 0.87)',
              pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
              pointBorderColor         : '#ffffff',
              pointHoverBorderColor    : '#ffffff'
          }
      ],
      options  : {
          spanGaps           : false,
          legend             : {
              display: false
          },
          maintainAspectRatio: false,
          tooltips           : {
              position : 'nearest',
              mode     : 'index',
              intersect: false
          },
          layout             : {
              padding: {
                  left : 24,
                  right: 32
              }
          },
          elements           : {
              point: {
                  radius          : 4,
                  borderWidth     : 2,
                  hoverRadius     : 4,
                  hoverBorderWidth: 2
              }
          },
          scales             : {
              xAxes: [
                  {
                      gridLines: {
                          display: false
                      },
                      ticks    : {
                          fontColor: 'rgba(0,0,0,0.54)'
                      }
                  }
              ],
              yAxes: [
                  {
                      gridLines: {
                          tickMarkLength: 16
                      },
                      ticks    : {
                          stepSize: 1000
                      }
                  }
              ]
          },
          plugins            : {
              filler: {
                  propagate: false
              }
          }
      }
    }

    widget2:any= {
      englishOpin: {
          value   : 492,
          ofTarget: 13
      },
      chartType : 'bar',
      datasets  : [
          {
              label: 'Conversion',
              data : [221, 428, 492, 471, 413, 344, 294]
          }
      ],
      labels    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      colors    : [
          {
              borderColor    : '#42a5f5',
              backgroundColor: '#42a5f5'
          }
      ],
      options   : {
          spanGaps           : false,
          legend             : {
              display: false
          },
          maintainAspectRatio: false,
          layout             : {
              padding: {
                  top   : 24,
                  left  : 16,
                  right : 16,
                  bottom: 16
              }
          },
          scales             : {
              xAxes: [
                  {
                      display: false
                  }
              ],
              yAxes: [
                  {
                      display: false,
                      ticks  : {
                          min: 100,
                          max: 500
                      }
                  }
              ]
          }
      }
     }

     widget3:any= {
      spanishOpin : {
          value   : '87k',
          ofTarget: 12
      },
      chartType  : 'line',
      datasets   : [
          {
              label: 'Impression',
              data : [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
              fill : false
          }
      ],
      labels     : ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
      colors     : [
          {
              borderColor: '#5c84f1'
          }
      ],
      options    : {
          spanGaps           : false,
          legend             : {
              display: false
          },
          maintainAspectRatio: false,
          elements           : {
              point: {
                  radius          : 2,
                  borderWidth     : 1,
                  hoverRadius     : 2,
                  hoverBorderWidth: 1
              },
              line : {
                  tension: 0
              }
          },
          layout             : {
              padding: {
                  top   : 24,
                  left  : 16,
                  right : 16,
                  bottom: 16
              }
          },
          scales             : {
              xAxes: [
                  {
                      display: false
                  }
              ],
              yAxes: [
                  {
                      display: false,
                      ticks  : {
                          // min: 100,
                          // max: 500
                      }
                  }
              ]
          }
      }
    }

    widget4:any= {
      totalOpin  : {
          value   : 882,
          ofTarget: -9
      },
      chartType: 'bar',
      datasets : [
          {
              label: 'Visits',
              data : [432, 428, 327, 363, 456, 267, 231]
          }
      ],
      labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      colors   : [
          {
              borderColor    : '#f44336',
              backgroundColor: '#f44336'
          }
      ],
      options  : {
          spanGaps           : false,
          legend             : {
              display: false
          },
          maintainAspectRatio: false,
          layout             : {
              padding: {
                  top   : 24,
                  left  : 16,
                  right : 16,
                  bottom: 16
              }
          },
          scales             : {
              xAxes: [
                  {
                      display: false
                  }
              ],
              yAxes: [
                  {
                      display: false,
                      ticks  : {
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
        private _analyticsDashboardService: AnalyticsDashboardService,
        private _estadPrueba: EstadXidiomaService
    )
    {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
       // this._estadPrueba.getEstadistica();
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
        this.widgets = this._analyticsDashboardService.widgets;
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

