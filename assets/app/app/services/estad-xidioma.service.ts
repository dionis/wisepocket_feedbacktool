import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';


@Injectable({
  providedIn: 'root'
})
export class EstadXidiomaService {
  dataEn: any = []
  dataEs: any = []
  dataTotal: any = []
  currentCamapingId: string;
  constructor(private _http: HttpClient) {

  }

  setCurrentCamaignId(currentCamapignId: string) {
    if (typeof (currentCamapignId) !== 'undefined')
      this.currentCamapingId = currentCamapignId;
  }

  getDataEn(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/getCantENXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataEn = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataEn);
          return this.dataEn
        }
      }))
  }

  getDataEs(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/getCantESXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataEs = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataEs);
          return this.dataEs
        }
      }))
  }

  getDataTotal(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByidioma/getCantTotalXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataTotal = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataTotal);
          return this.dataTotal
        }
      }))
  }

}
