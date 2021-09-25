import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AnalyticsXIdiomaDashboardDb } from '../fake-db/dashboard-analyticsXIdioma';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';
import { CampaignService } from '../services/campaign.service';
import { SharedVariablesService } from './shared-variables.service';


@Injectable({
  providedIn: 'root'
})
export class EstadXidiomaService {
  campaign: CampaignService
  dataTotal: any = []
  currentCamapingId: string;
  constructor(private _http: HttpClient, private servCamp: SharedVariablesService,) {

  }

 /* setCurrentCamaignId(currentCamapignId: string) {
    if (typeof (currentCamapignId) !== 'undefined')
      this.currentCamapingId = currentCamapignId;
  }*/

  getDataEn(): Observable<any> {
    let campaign_id = this.servCamp.getId();
    return this._http.get<any>(environment.sails_services_urlpath + '/estadisticaByidioma/getCantENXDia?id=' + campaign_id)

  }

  getDataEs(): Observable<any> {

    let campaign_id = this.servCamp.getId();
    return this._http.get<any>(environment.sails_services_urlpath  + '/estadisticaByidioma/getCantESXDia?id=' + campaign_id)

  }

  getDataTotal(): Observable<any> {

    let campaign_id = this.servCamp.getId();

    return this._http.get<any>(environment.sails_services_urlpath +  '/estadisticaByidioma/getCantTotalXDia?id=' + campaign_id)

  }

  getIntervalDataTotal(currentDate: string, language: string = "ingles"): Observable<any> {

    let campaign_id = this.servCamp.getId();

    let httpParams = new HttpParams()
      .append("id", campaign_id)
      .append("client_timestamp", currentDate)
      .append("language", language)
    ///estadisticaByidioma/getCantTotalXDia?id=' + campaign_id
    return this._http.get<any>(environment.sails_services_urlpath +  '/estadisticaByidioma/getIntervalInADay', { params: httpParams })

      .pipe(map((responseData: any) => {
        if (responseData.data) {
          this.dataTotal = responseData.data;
          console.log("******* DATA in USE getIntervalDataTotal *********")
          console.log(this.dataTotal);
          return responseData.data
        }
      }))
  }
  getAllStadistics(currentDate: string): Observable<any[]> {
    return combineLatest([this.getDataEn(), this.getDataEs(), this.getDataTotal(), this.getIntervalDataTotal(currentDate), this.getIntervalDataTotal(currentDate, 'espanol')]);

  }

  getEstLangById(id) {
    if (id == this.campaign.getCampaignId) {
      return combineLatest([this.getDataEn(), this.getDataEs(), this.getDataTotal()]);
    }
  }

}
