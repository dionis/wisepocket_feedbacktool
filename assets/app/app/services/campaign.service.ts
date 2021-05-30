//import * as console from 'console';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Campaign } from '../models/campaing.model';
import { weekdays } from 'moment';
import { WeekDay } from '@angular/common';
import * as faker from 'faker';
@Injectable({
  providedIn: 'root',
})

export class CampaignService {
  Campaign: Campaign;
  campaign: any = []
  onCampaignsChanged: BehaviorSubject<any>;
  onSelectedCampaignsChanged: BehaviorSubject<any>;
  onCampDataChanged: BehaviorSubject<any>;
  onSearchTextChanged: Subject<any>;
  onFilterChanged: Subject<any>;

  filterBy: string;
  selectedCampaigns: string[] = [];
  selectedCampaign: Campaign;
  campaignsofUserTotal: any;


  constructor(private _http: HttpClient
  ) {
    this.onCampaignsChanged = new BehaviorSubject([]);
    this.onSelectedCampaignsChanged = new BehaviorSubject([]);
    this.onCampDataChanged = new BehaviorSubject([]);
    this.onSearchTextChanged = new Subject();
    this.onFilterChanged = new Subject();
  }


  getCampaignbyUser(page:string, limit:string,sortCriteria:string,filter:string) {  //Recibe el id como parametro

    //pagina apartir de 0 //page=0 es de prueba
    console.log(limit);
    const campaignService = this;
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/campaign/getCampaignbyUser/',
    {params: {
              'page': page,
              'limit':limit,
              'criteria': sortCriteria,
              'filter':filter}})
      .pipe(map((responseData: any) => {
        if (responseData.data) {
          let arrayCamps: any[] = [];
            if(responseData.length !== 0){
              arrayCamps = responseData['data'];
            }
            this.campaignsofUserTotal = arrayCamps.length;
            return arrayCamps;
        }
      }))
  }

  getCampaignId(){ //Devuelve el id de la campaña
      return this.campaign.map(campaign => {
          this.selectedCampaign.id;
      });
  }

  getCampaignbyId(id:string){
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport +
    '/campaign/getCampaignById',
    {params: {'id': id}});
    // .pipe(map((camp:any)=>{
    //   if(camp){
    //     let camp = new Campaign(camp);
    //   }
    // }))
  }

  testSelectedRandomCamaping() : Promise< boolean>{
    if ( typeof(this.campaign) !== 'undefined' && this.campaign.length > 0){
      return new Promise (( resolve, reject)=>{
        this.selectedCampaign = faker.random.arrayElement(this.campaign);
        console.log("Selected Campaing Data ", this.selectedCampaign );
        resolve(true);
      })

    }
    else
      return null;
  }


  getMyCamps() {
    console.log(this.campaign)
    return this.campaign;
  }

  getMyCampsID() {
    console.log(this.campaign[0].id)
    return this.campaign[0].id;
  }


  getMyCampsIDEx() {
    let campaign:any = localStorage.getItem('campaign_selected');
    console.log('Campaign Selected', campaign );
    //localStorage.setItem('campaign_selected',JSON.stringify(campaign));
    return JSON.parse(campaign);
  }



  updateCampaign(campaign): Promise<any>
  {
      return new Promise((resolve, reject) => {

          this._http.post('api/contacts-contacts/' + campaign.nombre, {...campaign})
              .subscribe(response => {
                  //this.getCampaignbyUser(campaign.id);
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
                this.onSelectedCampaignsChanged.next(this.selectedCampaigns);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedCampaigns.push(id);

        // Trigger the next event
        this.onSelectedCampaignsChanged.next(this.selectedCampaigns);
    }

    deleteCampaign(campaign): void
    {
        const campaignIndex = this.campaign.indexOf(campaign);
        this.campaign.splice(campaignIndex, 1);
        this.onCampaignsChanged.next(this.campaign);
    }

    countUserCampaigns(){
      return this._http.get(
        environment.sails_services_urlpath+":"+environment.sails_services_urlport+
        '/campaign/countUserCampaigns',
        )
        .pipe(
          map((responseData:any)=>{
            this.campaignsofUserTotal = responseData['data'];
           // console.log(this.campaignsofUserTotal)
            return responseData;
          })
        )
    }


}
