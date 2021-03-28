import { PromiseType } from 'protractor/built/plugins';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Campaing } from '../models/campaing.model';

@Injectable({
  providedIn: 'root',
})
export class CampaingService {
  private Campaing: Campaing;
  token: any;
  constructor(private _http: HttpClient) {
    this.Campaing = new Campaing();
  }
  getAllCampaign(): Promise<any>{

    return new Promise((resolve,reject)=>{

      // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
      //   resolve(res.data);
      // },reject)
      console.log("Data getAll Campaign");
      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/getCampaign')
      .subscribe((res:any)=>{
        console.log("Data from Sails", res.data)
        resolve(res.data);
      },reject)
    })
  }

  getCampaignById(): Promise<any>{
    return new Promise((resolve,reject)=>{
      environment.sails_services_urlpath
      // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
      //   resolve(res.data);
      // },reject)

      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaign')
      .subscribe((res:any)=>{
        resolve(res.data);
      },reject)
    })
  }
}
