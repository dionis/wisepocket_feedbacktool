import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';


@Injectable({
  providedIn: 'root'
})
export class EstadXidiomaService {
   dataEn: any
  constructor(private _http: HttpClient ) {

  }

  getDataEn() {
    environment.sails_services_urlpath
    let campaign_id = '6072f83c677baa1d9c08dbb4';
    console.log(campaign_id);
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/getCantENXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {

        
        if (responseData.data) {
           this.dataEn = responseData.data
           console.log(this.dataEn);
          return this.dataEn
        }
      })).subscribe(res => {
      },
        error => {
          this.dataEn = null;
        })

  }

  getMyDataEn() {
    this.getDataEn()
    console.log(this.dataEn);
    return this.dataEn
  }




}
