import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';
import { EstadisticaXIdioma } from '../models/estadistica.model';

@Injectable({
  providedIn: 'root'
})
export class EstadXidiomaService {

  constructor(private _http: HttpClient, /*private _widget: AnalyticsXIdiomaDashboardDb*/) {

  }

  /*getEstadistica() {
    environment.sails_services_urlpath
    let campaign_id = '606a006dd843ea1d447dc95e';
    console.log(campaign_id);
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/updateEstadIdioma?id=' + campaign_id)
      .pipe(map((responseData: any) => {

        if (responseData.data) {
        /*  this._widget.widgets.widget2.englishOpin.value = responseData.data.cantEnglish;
          this._widget.widgets.widget3.spanishOpin.value = responseData.data.cantSpanish;
          this._widget.widgets.widget4.totalOpin.value = responseData.data.totalOpin;
          return this._widget
        }
      })).subscribe(res => {
      },
        error => {
          this._widget = null;
        })


  }

  getMyEstad(): AnalyticsXIdiomaDashboardDb {
    console.log(this._widget)
    return this._widget;
  }*/










}
