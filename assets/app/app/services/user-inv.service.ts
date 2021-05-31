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
  onUserDataChanged: BehaviorSubject<any>;
  contacts: UserInv[];
  user_id: string;
  constructor(private _http: HttpClient, private user: UserService,) {
    this.onContactsChanged = new BehaviorSubject([]);
    this.onUserDataChanged = new BehaviorSubject([]);
    this.user_id = this.user.getMyUserId();
  }

  addInvUser(invitado): Observable<any> {
    this.user_id = this.user.getMyUserId()
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/create?id=' + this.user_id, invitado)
  }

  getInvitados(): Observable<any> {
    this.user_id = this.user.getMyUserId()
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/getInvXUserChief?id=' + this.user_id)
  }

  getUsers(dataInv) {

    this.contacts = dataInv.map(data => {
      return new UserInv(data);
    })
    this.onContactsChanged.next(this.contacts);
  }

  updateInfo(invitado): Observable<any> {
    console.log(invitado.nombre);
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/updateInfo?id=' + invitado.id, invitado)

  }

  updatePass(pass, invitado): Observable<any> {
    console.log(invitado.nombre);
    let httpParams = new HttpParams()
      .append("password", pass)
      .append("id", invitado.id)
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/updatePass', { params: httpParams })

  }

  updateAcceso(acceso, invitado): Observable<any> {
    console.log(invitado.nombre);
    let httpParams = new HttpParams()
      .append("acceso", acceso)
      .append("id", invitado.id)
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/updateAcces', { params: httpParams })

  }

  AddCampInv(campName, invitado): Observable<any> {
    console.log(invitado.nombre);
    let httpParams = new HttpParams()
      .append("nombre", campName)
      .append("id", invitado.id)
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/addCampaigns', { params: httpParams })

  }
  deleteUserInv(invitado): Observable<any> {
    console.log(invitado.id);
    let httpParams = new HttpParams()
      .append("id", invitado.id)
    return this._http.delete(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/deleteUserInvitado',{ params: httpParams })

  }

  getInvitadXID(invitado): Observable<any> {

    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/getInvitadoById', invitado)/*.pipe(map((responseData: any)=>{
      this.contacts = responseData
      this.onContactsChanged.next(this.contacts);
      console.log(this.contacts);
      
    }))*/

  }

  fixIDOut() {
    console.log("Eliminando userID...");
    this.user_id = ''
    if (this.user_id === '') {
      return true
    }
    else return false
  }
}

