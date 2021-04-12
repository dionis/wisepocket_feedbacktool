//import * as console from 'console';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Campaign } from '../models/campaing.model';
import { weekdays } from 'moment';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class CampaignService {
  campaign: any = []



  constructor(private _http: HttpClient
  ) {

  }


  getCampaignbyUser(id: String) {  //Recibe el id como parametro
    environment.sails_services_urlpath
    //pagina apartir de 0 //page=0 es de prueba
    //En la interfaz puede poner pagina 1 pero al pasar el parametro puede restar 1, es una sugerencia y ademas necesaria
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/campaign/getCampaignbyUser/_id?id=' + id + '&page=0')
      .pipe(map((responseData: any) => {

        if (responseData.data) {
          for (let index = 0; index < responseData.data.length; index++) {
            this.campaign[index] = responseData.data[index]
          }
          return this.campaign
        }
      })).subscribe(res => {
      },
        error => {
          this.campaign = null;
        })
  }
  getMyCamps() {
    const date = new Date()
    console.log(date.toLocaleDateString('en-US', { weekday: 'long' }))
    //getMyCamps(): Campaign //Camapaign es el modelo creado para la vista
    console.log(this.campaign)
    return this.campaign;
  }
}
