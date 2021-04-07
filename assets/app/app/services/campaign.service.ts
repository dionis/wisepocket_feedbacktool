//import * as console from 'console';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Campaign } from '../models/campaing.model';

@Injectable({
  providedIn: 'root',
})

export class CampaignService {
  campaign: any = []
  user: any;
  token: any;
  onSearchTextChanged: Subject<any>;
  onFilterChanged: Subject<any>;
  onCampDataChanged: BehaviorSubject<any>;
  onCampaignChanged: BehaviorSubject<any>;
  onSelectedCampaignChanged: BehaviorSubject<any>;

  searchText: string;
  filterBy: string;
  selectedCampaigns: string[] = [];
  camp : any;

  // token: any;
  constructor(private _http: HttpClient
  ) {
    this.onCampaignChanged = new BehaviorSubject([]);
    this.onSelectedCampaignChanged = new BehaviorSubject([]);
    this.onCampDataChanged = new BehaviorSubject([]);
    this.onSearchTextChanged = new Subject();
    this.onFilterChanged = new Subject();

  }

  toggleSelectedCampaign(id): void
  {
      // First, check if we already have that contact as selected...
      if ( this.selectedCampaigns.length > 0 )
      {
          const index = this.selectedCampaigns.indexOf(id);

          if ( index !== -1 )
          {
              this.selectedCampaigns.splice(index, 1);

              // Trigger the next event
              this.onSelectedCampaignChanged.next(this.selectedCampaigns);

              // Return
              return;
          }
      }

      // If we don't have it, push as selected
      this.selectedCampaigns.push(id);

      // Trigger the next event
      this.onSelectedCampaignChanged.next(this.selectedCampaigns);
  }

  /**
   * Toggle select all
   */
  toggleSelectAll(): void
  {
      if ( this.selectedCampaigns.length > 0 )
      {
          this.deselectCampaigns();
      }
      else
      {
          this.selectCampaign();
      }
  }

  /**
   * Select contacts
   *
   * @param filterParameter
   * @param filterValue
   */
  selectCampaign(filterParameter?, filterValue?): void
  {
      this.selectedCampaigns = [];

      // If there is no filter, select all contacts
      if ( filterParameter === undefined || filterValue === undefined )
      {
          this.selectedCampaigns = [];
          this.campaign.map(campaign => {
              this.selectedCampaigns.push(campaign.nombre);
          });
      }

      // Trigger the next event
      this.onSelectedCampaignChanged.next(this.selectedCampaigns);
  }

  /**
   * Get camp data
   *
   * @returns {Promise<any>}
   */
  getCampData(): Promise<any>
  {
      return new Promise((resolve, reject) => {
              this._http.get('api/contacts-user/5725a6802d10e277a0f35724')
                  .subscribe((response: any) => {
                      this.camp = response;
                      this.onCampDataChanged.next(this.camp);
                      resolve(this.camp);
                  }, reject);
          }
      );
  }

  /**
   * Update campaign
   *
   * @param campaign
   * @returns {Promise<any>}
   */
  updateCampaign(campaign): Promise<any>
  {
      return new Promise((resolve, reject) => {

          this._http.post('api/campaigns-campaigns/' + campaign.nombre, {...campaign})
              .subscribe(response => {
                  this.getCampaign();
                  resolve(response);
              });
      });
  }

  /**
   * Update user data
   *
   * @param campData
   * @returns {Promise<any>}
   */
  updateCampData(campData): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._http.post('api/campaign-camp/' + this.camp.nombre, {...campData})
              .subscribe(response => {
                  this.getCampData();
                  this.getCampaign();
                  resolve(response);
              });
      });
  }

  /**
   * Deselect contacts
   */
  deselectCampaigns(): void
  {
      this.selectedCampaigns = [];

      // Trigger the next event
      this.onSelectedCampaignChanged.next(this.selectedCampaigns);
  }

  /**
   * Delete contact
   *
   * @param campaign
   */
  deleteCampaign(campaign): void
  {
      const campaignIndex = this.campaign.indexOf(campaign);
      this.campaign.splice(campaignIndex, 1);
      this.onCampaignChanged.next(this.campaign);
  }

  /**
   * Delete selected contacts
   */
  deleteSelectedCampaigns(): void
  {
      for ( const campaignNombre of this.selectedCampaigns )
      {
          const campaign = this.campaign.find(_campaign => {
              return _campaign.nombre === campaignNombre;
          });
          const campaignIndex = this.campaign.indexOf(campaign);
          this.campaign.splice(campaignIndex, 1);
      }
      this.onCampaignChanged.next(this.campaign);
      this.deselectCampaigns();
  }


getCampaign(): Promise<any>{
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
}

  getCampaignbyUser(id: String) {  //Recibe el id como parametro
    environment.sails_services_urlpath
   //pagina apartir de 0 //page=0 es de prueba
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
