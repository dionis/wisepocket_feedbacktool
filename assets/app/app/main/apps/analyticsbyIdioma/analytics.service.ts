import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EstadisticaXIdioma } from '../../../models/estadistica.model';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { AnalyticsXIdiomaDashboardDb } from '../../../fake-db/dashboard-analyticsXIdioma';

@Injectable()
export class AnalyticsDashboardService implements Resolve<any>
{


    widgets: any[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        //private _estXIdioma: AnalyticsXIdiomaDashboardDb
    ) {
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/analyticsXIdioma-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
    getEstadistica() {
        environment.sails_services_urlpath
        let campaign_id = '606a006dd843ea1d447dc95e';
        console.log(campaign_id);
        this._httpClient.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/updateEstadIdioma?id=' + campaign_id)
            .pipe(map((responseData: any) => {

                if (responseData.data) {
                    AnalyticsXIdiomaDashboardDb.widgets.widget2.englishOpin.value = responseData.data.cantEnglish;
                    AnalyticsXIdiomaDashboardDb.widgets.widget3.spanishOpin.value = responseData.data.cantSpanish;
                    AnalyticsXIdiomaDashboardDb.widgets.widget4.totalOpin.value = responseData.data.totalOpin;
                }
            }))
    }
}
