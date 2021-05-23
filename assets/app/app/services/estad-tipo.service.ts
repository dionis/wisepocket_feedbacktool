import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadTipoService {
  campaign: CampaignService
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

  }

  getDataNeg(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCNegativaXDia?id=' + campaign_id)

  }

  getDataNeu(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCNeutraXDia?id=' + campaign_id)

  }

  getDataTotal(): Observable<any> {

    let campaign_id = '';

    if (typeof (this.currentCamapingId) !== 'undefined' && this.currentCamapingId !== "") {
      campaign_id = this.currentCamapingId;
      console.log(" Use a campaing id to ", campaign_id);
    }

    return this._http.get<any>(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/estadisticaByTipo/getCantTotalXDia?id=' + campaign_id)

  }

  getAllStadistics(): Observable<any[]> {
    return combineLatest([this.getDataPos(), this.getDataNeg(), this.getDataNeu(), this.getDataTotal()]);

  }

  getEstPolyById(id) {
    if (id == this.campaign.getCampaignId) {
      return combineLatest([this.getDataPos(), this.getDataNeg(), this.getDataNeu(), this.getDataTotal()]);
    }
  }

}