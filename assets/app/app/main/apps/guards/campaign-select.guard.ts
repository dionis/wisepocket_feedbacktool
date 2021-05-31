//import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';
//import { reject } from 'lodash';
import { Observable } from 'rxjs';
import { SharedVariablesService } from '../../../services/shared-variables.service';
import { UserService } from '../../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignSelectGuard implements CanActivate {
  constructor(private sharedvar:SharedVariablesService,
              private userService: UserService,
              private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.sharedvar.campaignSelected.toPromise().then(camp=>{
    //   console.log(camp)
    //   if(camp!==''){
    //     return true;
    //   }else{
    //     alert('You most Select a Campaign!!!')
    //     return false;
    //   }
    // })
    const camp_id = this.sharedvar.getId()
    if(camp_id !=='' && this.userService.isLoggedIn()){
      return true;
    }else{
      if(this.userService.isLoggedOut()){
        this.userService.logout();
        this.router.navigate(['/auth/login']);
      }else{
        alert('You most Select a Campaign!!!');
        this.router.navigate(['/apps/campaign/myCampaigns']);
      }
      return false;
    }
  }
  
}
