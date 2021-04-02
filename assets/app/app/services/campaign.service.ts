//import * as console from 'console';
import { PromiseType } from 'protractor/built/plugins';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Campaign } from '../models/campaing.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class CampaignService {
  private campaign: Campaign[];
  // token: any;
  constructor(private _http: HttpClient) {
    //this.campaign = new Campaign();
  }
  /* getCampaign(): Promise<any>{
       
     return new Promise((resolve,reject)=>{
     //  environment.sails_services_urlpath
       // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
       //   resolve(res.data);
       // },reject)
   
       this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaign')
       .subscribe((res:any)=>{
         console.log("Data from Sails", res.data)
         resolve(res.data);
       },reject)
     })
   }*/


  getCampaignbyUser() {
    environment.sails_services_urlpath
    // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
    //   resolve(res.data);
    // },reject)
    //const user = UserService
    //const jwt = new JwtHelperService();
    //let token = jwt.decodeToken(localStorage.getItem('id_token'));
    let user_id = '6067591c0b762a27e0a64be9'/*token._id*/;
    console.log(user_id);
    //>>>>> BUSCAR COMO Encontrar id del usuario activo en sesion y pasarlo al servicio, implementar la paginaciion en la interfaz
    // >>>>> El id que tiene puesto es de ejemplo, cambia en cada inicio
    // >>>>> Ver como Mostrar las campañas en la inerfaz, PD: por consola si salen
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/campaign/getCampaignbyUser/_id?id=' + user_id + '&page=0')
      .pipe(map((responseData: any) => {

        if (responseData.data) {
          this.campaign = responseData.data;
          console.log(this.campaign);
          return this.campaign;
        } else {
          return responseData;
        }
      })).subscribe(res => {
      },
        error => {
          this.campaign = null;
        })
  }

}