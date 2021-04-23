import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';
import { BehaviorSubject, Observable,  combineLatest ,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadTipoService {
  dataPos: any = []
  dataNeg: any = []
  dataNeu: any = []
  dataTotal: any = []
  currentCamapingId: string;
  constructor(private _http: HttpClient) {

  }

  setCurrentCamaignId(currentCamapignId: string) {
    if (typeof (currentCamapignId) !== 'undefined')
      this.currentCamapingId = currentCamapignId;
  }

  getDataPos(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCPostivaXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataPos = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataPos);
          return this.dataPos
        }
      }))
  }

  getDataNeg(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCNegativaXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataNeg = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataNeg);
          return this.dataNeg
        }
      }))
  }

  getDataNeu(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCNeutraXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataNeu = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataNeu);
          return this.dataNeu
        }
      }))
  }

  getDataTotal(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCantTotalXDia?id=' + campaign_id)
      .pipe(map((responseData: any) => {


        if (responseData.data) {
          this.dataTotal = responseData.data;
          console.log("******* DATA in USE *********")
          console.log(this.dataTotal);
          return this.dataTotal
        }
      }))
  }

  getAllStadistics(): Observable<any[]>{
     return combineLatest([ this.getDataPos(),this.getDataNeg(),this.getDataNeu,this.getDataTotal()]);

  }

}