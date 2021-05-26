import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInv } from '../models/userInv.model';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UserInvService {

  constructor(private _http: HttpClient, private user: UserService) { }

  addInvUser(invitado): Observable<any> {
    let userID = this.user.getMyUser().id
    console.log(userID);
    if (this.user.getMyUser().isAdmin) {
      return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/create?id=' + userID, invitado)
    }
    else {
     swal.fire('No está autorizado')
    }

  }

  getInvitados(): Observable<any> {
    let userID = this.user.getMyUser().id
    console.log(userID);
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/getInvXUserChief?id=' + userID)

  }

}

