//import * as console from 'console';
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
      //   resolve(res.data);
      console.log("Data getAll Campaign");
      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaign')
      .subscribe((res:any)=>{
        console.log("Data from Sails", res.data)
        resolve(res.data);
      },reject)
    })
  }

  getCampaignById(): Promise<any>{
    return new Promise((resolve,reject)=>{


      // this._http.get(  environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/user/getUserById/_id?id='+user_id,
      // {params: idparams}).pipe(map((responseData:any) =>{

      //     if(responseData.data){
      //       console.log(responseData.data.name)
      //       this.user.name = responseData.data.name;
      //       this.user.email = responseData.data.email;
      //       this.user.phone = responseData.data.phone;
      //       this.user.organization = responseData.data.organization;
      //       this.user.cargo = responseData.data.cargo;
      //       console.log(this.user);
      //       return this.user;
      //     }else{
      //       return responseData;
      //     }
      // })).subscribe(res=>{
      // },
      // error =>{
      //   this.user = null;
      // })


      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaign')
      .subscribe((res:any)=>{
        resolve(res.data);
      },reject)
    })
  }
}
