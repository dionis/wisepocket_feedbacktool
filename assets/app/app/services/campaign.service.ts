//import * as console from 'console';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Campaign } from '../models/campaing.model';

@Injectable({
  providedIn: 'root',
})

export class CampaignService {
  campaign: any = []
  user: any
  // token: any;
  constructor(private _http: HttpClient
    ) {
    
  }

  getCampaignbyUser(id:String) {  //Recibe el id como parametro
    environment.sails_services_urlpath
    //implementar la paginaciion en la interfaz para pasarle la pagina al servicio, pagina apartir de 0 //page=0 es de prueba
    //En la interfaz puede poner pagina 1 pero al pasar el parametro puede restar 1, es una sugerencia y ademas necesaria
    this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/campaign/getCampaignbyUser/_id?id=' + id + '&page=0')
      .pipe(map((responseData: any) => {

        if (responseData.data) {
          for (let index = 0; index < responseData.data.length; index++) {
            this.campaign[index] = responseData.data[index].nombre
          }
          console.log(this.campaign);
          
          return this.campaign
        }
      })).subscribe(res => {
      },
        error => {
          this.campaign = null;
        })
  }
  getMyCamps(): Campaign {          //getMyCamps(): Campaign //Camapaign es el modelo creado para la vista
    console.log(this.campaign)
    return this.campaign;
  }
}