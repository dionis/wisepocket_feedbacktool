import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';


@Injectable({
  providedIn: 'root'
})
export class EstadXidiomaService {

  constructor(private _http: HttpClient, ) {

  }

  /*getEstadistica() {
    environment.sails_services_urlpath
    let campaign_id = '606f50e3c37c8833c42e09ca';
    console.log(campaign_id);
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/updateEstadIdioma?id=' + campaign_id)
      .pipe(map((responseData: any) => {
        console.log(responseData.data);
        
        if (responseData.data) {
          this._widget.widget2.englishOpin.value = responseData.data.cantEnglish;
          return this._widget.widget2.englishOpin.value
        }
      })).subscribe(res => {
      },
        error => {
          this._widget = null;
        })


  }

  getMyEstad(): WidgetM {
    console.log(this._widget)
    return this._widget;
  }







*/


}
