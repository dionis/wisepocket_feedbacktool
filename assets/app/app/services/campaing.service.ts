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
 /* getCampaign(): Promise<any>{

    return new Promise((resolve,reject)=>{
      //   resolve(res.data);
      // },reject)

      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaign')
      .subscribe((res:any)=>{
        console.log("Data from Sails", res.data)
        resolve(res.data);
      },reject)
    })
  }*/

  getCampaignbyUser(): Promise<any>{
    return new Promise((resolve,reject)=>{
      environment.sails_services_urlpath
      // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
      //   resolve(res.data);
      // },reject)

 //>>>>> BUSCAR COMO Encontrar id del usuario activo en sesion y pasarlo al servicio, implementar la paginaciion en la interfaz
 // >>>>> El id que tiene puesto es de ejemplo, cambia en cada inicio
 // >>>>> Ver como Mostrar las campañas en la inerfaz, PD: por consola si salen
      this._http.get(environment.sails_services_urlpath+":"+environment.sails_services_urlport+'/campaign/getCampaignbyUser/_id?id=6061ed318eb5252338dd3a4c&page=0')
      .subscribe((res:any)=>{
        resolve(res.data);
      },reject)
    })
  }
}
