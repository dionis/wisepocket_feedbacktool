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
  onCampaignsChanged: BehaviorSubject<any>;
  onSelectedCampaignsChanged: BehaviorSubject<any>;
  onCampDataChanged: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onFilterChanged: Subject<any>;

  filterBy: string;
  selectedCampaigns: string[] = [];


  constructor(private _http: HttpClient
  ) {
    this.onCampaignsChanged = new BehaviorSubject([]);
    this.onSelectedCampaignsChanged = new BehaviorSubject([]);
    this.onCampDataChanged = new BehaviorSubject([]);
    this.onSearchTextChanged = new Subject();
    this.onFilterChanged = new Subject();
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

  updateCampaign(campaign): Promise<any>
  {
      return new Promise((resolve, reject) => {

          this._http.post('api/contacts-contacts/' + campaign.nombre, {...campaign})
              .subscribe(response => {
                  this.getCampaignbyUser(campaign.id);
                  resolve(response);
              });
      });
  }
  
  selectCampaign(filterParameter?, filterValue?): void
    {
        this.selectedCampaigns = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedCampaigns = [];
            this.campaign.map(campaign => {
                this.selectedCampaigns.push(campaign.id);
            });
        }

        // Trigger the next event
        this.onSelectedCampaignsChanged.next(this.selectedCampaigns);
    }


    deselectCampaigns(): void
    {
        this.selectedCampaigns = [];

        // Trigger the next event
        this.onSelectedCampaignsChanged.next(this.selectedCampaigns);
    }

    deleteSelectedCampaigns(): void
    {
        for ( const contactId of this.selectedCampaigns )
        {
            const contact = this.campaign.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.campaign.indexOf(contact);
            this.campaign.splice(contactIndex, 1);
        }
        this.onCampaignsChanged.next(this.campaign);
        this.deselectCampaigns();
    }


}
