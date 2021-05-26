import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInv } from '../models/userInv.model';


@Injectable({
  providedIn: 'root'
})
export class UserInvService {
  onContactsChanged: BehaviorSubject<any>;
  contacts: UserInv[];
  constructor(private _http: HttpClient, private user: UserService,) {
    this.onContactsChanged = new BehaviorSubject([]);
  }

  addInvUser(invitado): Observable<any> {
    let userID = this.user.getMyUser().id
    console.log(userID);
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/create?id=' + userID, invitado)

  }

  getInvitados(): Observable<any> {
    let userID = this.user.getMyUser().id
    console.log(userID);
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/getInvXUserChief?id=' + userID)

  }

  getUsers(dataInv) {
   
    this.contacts = dataInv.map(data => {
      return new UserInv(data);
    })
    this.onContactsChanged.next(this.contacts);
  }
}

