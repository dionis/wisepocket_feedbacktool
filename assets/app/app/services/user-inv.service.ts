import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInv } from '../models/userInv.model';
import { SharedVariablesService } from './shared-variables.service';


@Injectable({
  providedIn: 'root'
})
export class UserInvService {
  onContactsChanged: BehaviorSubject<any>;
  onUserDataChanged: BehaviorSubject<any>;
  contacts: UserInv[];
  user_id: string;
  constructor(private _http: HttpClient, private user: UserService, private servCamp: SharedVariablesService,) {
    this.onContactsChanged = new BehaviorSubject([]);
    this.onUserDataChanged = new BehaviorSubject([]);
    this.user_id = this.user.getMyUserId();
  }

  addInvUser(invitado): Observable<any> {
    this.user_id = this.user.getMyUserId()
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/create', { id: this.user_id, nombre: invitado.nombre, correo: invitado.correo, telefono: invitado.telefono, direccion: invitado.direccion })
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

  AddCampInv(invitado): Observable<any> {
    const cammID = this.servCamp.getId()
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/addCampaigns', { id: invitado.id, campID: cammID })

  }

  deleteUserInv(invitado): Observable<any> {
    console.log(invitado.id);
    let httpParams = new HttpParams()
      .append("id", invitado.id)
    return this._http.delete(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/deleteUserInvitado', { params: httpParams })
  }

  deleteAcces(invitado): Observable<any> {
    return this._http.delete(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/acceso/deleteAcces', { params: { 'id': invitado.id, 'campID': this.servCamp.getId() } })
  }

  deleteRelacion(invitado): Observable<any> {
    return this._http.delete(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/deleteAsociar', { params: { 'id': invitado.id, 'campID': this.servCamp.getId() } })

  }

  updateInfo(invitado): Observable<any> {
    console.log(invitado.nombre);
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/updateInfo?id=' + invitado.id, invitado)

  }

  updatePass(invitado): Observable<any> {
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/updatePass', invitado)

  }

  deleteupdatePass(invitado): Observable<any> {
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/deleteupdatePass', invitado)

  }

  darAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId()
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/acceso/darAcceso', { id: invitado.id, campID: cammID })

  }

  quitarAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId()
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/acceso/quitarAcceso', { id: invitado.id, campID: cammID })

  }

  devolverAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId()
    return this._http.patch(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/acceso/devolverAcceso', { id: invitado.id, campID: cammID })

  }

  getStatusAcceso(invitado): Observable<any> {

    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/acceso/getStatusAcceso', { params: { 'id': invitado.id, 'campID': this.servCamp.getId() } })

  }


  getInvitadXID(invitado): Observable<any> {
    return this._http.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/getInvitadoById', invitado)
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

