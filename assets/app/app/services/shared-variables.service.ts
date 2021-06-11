import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

enum polarityColors{
  negative = 'Red',
  positive = 'Blue',
  neutral = 'Grey' 
};
@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {
  
  campaignSelected: Subject<any>;
  //capaign_name: Subject<any>;
  campaignSelectedId : Subject<string>;
  userlogged: BehaviorSubject<boolean>;

  userSelected: Subject<any>;
  constructor() {

    this.campaignSelected = new Subject<any>();
    this.userSelected = new Subject<any>();
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    console.log(campaign)
    this.campaignSelected.next(campaign!==null?campaign:'');
    this.userlogged = new BehaviorSubject<boolean>(localStorage.getItem('id_token')!==null);
  }

  getName():string{
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    return campaign!==null?campaign.nombre:'';
  }

  getId():string{
    const campaign = JSON.parse(localStorage.getItem('campaign_selected'))
    return campaign!==null?campaign.id:'';
  }

  // setCamp(camp:any){
  //   sessionStorage.setItem('campaign_selected',camp);
  //   //this.campaignSelected.next(this.campaing);
  // }
}
