import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInv } from '../models/userInv.model';


@Injectable({
  providedIn: 'root'
})
export class UserInvService {

  constructor(private _http: HttpClient, private user: UserService) { }

  addInvUser(invitado): Observable<any> {
    let userID = this.user.getMyUser().id
    console.log(userID);
    return this._http.post(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/userInvitado/create?id=' + userID, invitado)

  }
  /*  .pipe(map((responseData: any) => {

        if (responseData.data) {
          console.log(responseData.data.name)
          this.invitado.id = responseData.data.id;
          this.invitado.nombre = responseData.data.nombre;
          this.invitado.correo = responseData.data.correo;
          this.invitado.telefono = responseData.data.telefono;
          this.invitado.isAdmin = responseData.data.isAdmin;
          this.invitado.acceso = responseData.data.acceso;
          this.invitado.invitadoBY = responseData.data.invitadoBY;
          console.log("********* Current UserINVITADO data *******")
          console.log(this.invitado);

          return this.invitado;
        } else {
          return responseData;
        }
      }))*/
}

