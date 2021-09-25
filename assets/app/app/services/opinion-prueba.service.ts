import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { reject } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { FuseUtils } from '../../@fuse/utils';
import { environment } from '../../environments/environment';
import { OpinionTest } from '../models/opinionTest.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionPruebaService implements Resolve<any>{
  opinions: OpinionTest[];
  onOpinionsChanged: BehaviorSubject<any>;
  onSearchTextChanged: BehaviorSubject<any>;
  searchText = '';
  constructor(private _httpClient: HttpClient) {
    this.onOpinionsChanged = new BehaviorSubject<any>([]);
    this.onSearchTextChanged = new BehaviorSubject<any>('');
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve,reject)=>{
      Promise.all([
        this.getOpinionsFromBAck()
      ])
      .then(()=>{
        this.onSearchTextChanged.subscribe(searchtxt=>{
          this.searchText = searchtxt;
          this.getOpinionsFromBAck();
        });
        resolve();
      },reject)
    })
  }

  /*
    * Getting Opinions from BAckend
    *
    */
  getOpinionsFromBAck(){
    return new Promise((resolve,reject)=>this._httpClient.get(
        environment.sails_services_urlpath +  '/opinion/getOpinion',
        {params:{}})
         .subscribe((opinions:any)=>{
             this.opinions = opinions.map(opinion => {
                 return new OpinionTest(opinion);
             });

             this.opinions = FuseUtils.filterArrayByString(this.opinions, this.searchText);

             this.onOpinionsChanged.next(this.opinions);

             resolve(this.opinions);

         },reject));
}

}
