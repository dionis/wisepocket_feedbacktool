import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {
  campaignSelected: Subject<any>;
  //capaign_name: Subject<any>;
  campaignSelectedId : Subject<string>;
  constructor() { 
    
    this.campaignSelected = new Subject<any>();
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    console.log(campaign)
    this.campaignSelected.next(campaign!==null?campaign:'');
  }

  getName():string{
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    return campaign!==null?campaign.nombre:'';
  }

  getId():string{
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    return campaign!==null?campaign.nombre:'';
  }

  // setCamp(camp:any){
  //   sessionStorage.setItem('campaign_selected',camp);
  //   //this.campaignSelected.next(this.campaing);
  // }
}
