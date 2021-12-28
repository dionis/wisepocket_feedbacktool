import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedVariablesService } from '../../../services/shared-variables.service';
import { UserService } from '../../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sharedvar:SharedVariablesService,
    private userService: UserService,
    private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.isLoggedOut()){
      this.userService.logout();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  
}
