import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
import { UserInv } from "../models/userInv.model";
import { SharedVariablesService } from "./shared-variables.service";
import { FuseUtils } from "../../@fuse/utils";

@Injectable({
  providedIn: "root",
})
export class UserInvService {
  onContactsChanged: BehaviorSubject<any>;
  onUserDataChanged: BehaviorSubject<any>;
  onFiltersChanged: BehaviorSubject<any>;
  onFiltersChangedInvAll: BehaviorSubject<any>;
  onSearchTextChanged: BehaviorSubject<any>;
  searchText: string;
  contacts: UserInv[];
  filters: any[];
  user_id: string;
  constructor(
    private _http: HttpClient,
    private user: UserService,
    private servCamp: SharedVariablesService
  ) {
    this.onContactsChanged = new BehaviorSubject([]);
    this.onUserDataChanged = new BehaviorSubject([]);
    this.onFiltersChanged = new BehaviorSubject([]);
    this.onFiltersChangedInvAll = new BehaviorSubject([]);
    this.onSearchTextChanged = new BehaviorSubject("");
    this.user_id = this.user.getMyUserId();
  }

  ///ADD INFO USER
  //Add UserInvitado
  addInvUser(invitado): Observable<any> {
    this.user_id = this.user.getMyUserId();
    return this._http.post(
      environment.sails_services_urlpath +
       "/userInvitado/create",
      {
        id: this.user_id,
        nombre: invitado.nombre,
        correo: invitado.correo,
        telefono: invitado.telefono,
        direccion: invitado.direccion,
        password: invitado.password,
      }
    );
  }
  ////Vincular a Camp
  AddCampInv(invitado): Observable<any> {
    const cammID = this.servCamp.getId();
    return this._http.post(
      environment.sails_services_urlpath +
        "/userInvitado/addCampaigns",
      { nombre: invitado.nombre, campID: cammID }
    );
  }
  ///ADD INFO USER

  ///GET INFOS
  getInvitados(): Observable<any> {
    this.user_id = this.user.getMyUserId();
    return this._http
      .get(
        environment.sails_services_urlpath +
          "/userInvitado/getInvXUserChief?id=" +
          this.user_id
      )
      .pipe(
        map((responseData: any) => {
          console.log(
            "Contacts>>> ",
            this.contacts,
            " SearchText>>> ",
            this.searchText
          );
          if (responseData.data) {
            console.log(responseData);
            this.contacts = responseData.data.map((contact) => {
              this.getUsers(responseData.data);
            });
            ///barra de busqueda
            this.onSearchTextChanged.subscribe((searchText) => {
              if (searchText !== "") {
                console.log("Search Value  ", searchText);
                this.searchText = searchText;
                this.contacts = FuseUtils.filterArrayByString(
                  this.contacts,
                  this.searchText
                );
                /*console.log(
                  "Search Value de nuevo  ",
                  searchText,
                  "Contacts  ",
                  this.contacts
                );*/
                this.onContactsChanged.next(this.contacts);
                this.getUsers(this.contacts);
                ///barra de busqueda
              } else {
                this.getUsers(responseData.data);
              }
            });
          }
        })
      );
  }

  ///Monitorea dataUser para Mostrarlos segun operaciones(todos, filtrado, al buscar, etc)
  getUsers(dataInv) {
    this.contacts = dataInv.map((data) => {
      return new UserInv(data);
    });
    this.onContactsChanged.next(this.contacts);
  }

  ///Invitado by ID
  getInvitadXID(invitado): Observable<any> {
    return this._http.get(
      environment.sails_services_urlpath +
         "/userInvitado/getInvitadoById",
      invitado
    );
  }
  ///GET INFOS

  ////UPDATES
  updateInfo(invitado): Observable<any> {
    console.log(invitado.nombre);
    return this._http.patch(
      environment.sails_services_urlpath +
         "/userInvitado/updateInfo?id=" +
        invitado.id,
      invitado
    );
  }

  /////CAMBIAR CONTRASEÑA
  updatePass(invitado): Observable<any> {
    console.log(invitado);

    return this._http.patch(
      environment.sails_services_urlpath +
        "/userInvitado/updatePass",
      invitado
    );
  }
  ////UPDATES

  /////DELETES INFOS
  deleteUserInv(invitado): Observable<any> {
    return this._http.delete(
      environment.sails_services_urlpath +
        "/userInvitado/deleteUserInvitado",
      { params: { id: invitado.id, campID: this.servCamp.getId() } }
    );
  }
  ///PASS
  ////UPDATES

  ////Una vez que se elimina un invitado Se borra toda info de su relacion con la Campaña
  deleteupdatePass(invitado): Observable<any> {
    return this._http.patch(
      environment.sails_services_urlpath +
        "/userInvitado/deleteupdatePass",
      invitado
    );
  }

  deleteRelacion(invitado): Observable<any> {
    return this._http.delete(
      environment.sails_services_urlpath +
        "/userInvitado/deleteAsociar",
      { params: { id: invitado.id, campID: this.servCamp.getId() } }
    );
  }

  deleteAcces(invitado): Observable<any> {
    return this._http.delete(
      environment.sails_services_urlpath +
         "/acceso/deleteAcces",
      { params: { id: invitado.id, campID: this.servCamp.getId() } }
    );
  }
  ////Una vez que se elimina un invitado Se borra toda info de su relacion con la Campaña
  /////DELETES INFOS

  ///ACCESO
  darAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId();
    return this._http.post(
      environment.sails_services_urlpath +
         "/acceso/darAcceso",
      { nombre: invitado.nombre, campID: cammID }
    );
  }

  quitarAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId();
    return this._http.patch(
      environment.sails_services_urlpath +
         "/acceso/quitarAcceso",
      { id: invitado.id, campID: cammID }
    );
  }

  devolverAcceso(invitado): Observable<any> {
    const cammID = this.servCamp.getId();
    return this._http.patch(
      environment.sails_services_urlpath +
        "/acceso/devolverAcceso",
      { id: invitado.id, campID: cammID }
    );
  }
  ///ACCESO

  ////STATUS de USER
  getStatusAsociado(invitado): Observable<any> {
    return this._http.get(
      environment.sails_services_urlpath +
        "/acceso/isAsociado",
      { params: { id: invitado.id, campID: this.servCamp.getId() } }
    );
  }

  getStatusAcceso(invitado): Observable<any> {
    return this._http.get(
      environment.sails_services_urlpath +
         "/acceso/getStatusAcceso",
      { params: { id: invitado.id, campID: this.servCamp.getId() } }
    );
  }
  ////STATUS de USER

  ///////////// FILTERS ////////////////////
  ///Invitados de la Camp
  getFiltersInvCAMP(): Observable<any> {
    return this._http
      .get(
        environment.sails_services_urlpath +
           "/campaign/getInvitadoXCamp",
        { params: { id: this.servCamp.getId() } }
      )
      .pipe(
        map((responseData: any) => {
          this.filters = responseData.data;
          this.onFiltersChanged.next(this.filters);
          this.getUsers(this.filters);
        })
      );
  }

  ///Todos los invitados
  getFiltersAllInv(): Observable<any> {
    return this._http
      .get(
        environment.sails_services_urlpath +
          "/userInvitado/getInvXUserChief?id=" +
          this.user_id
      )
      .pipe(
        map((responseData: any) => {
          this.filters = responseData.data;
          this.onFiltersChangedInvAll.next(this.filters);
          this.getUsers(this.filters);
        })
      );
  }
  /////////////  FILTERS //////////////////////////////

  ///Eliminar userId despues de cerrar sesion
  fixIDOut() {
    console.log("Eliminando userID...");
    this.user_id = "";
    if (this.user_id === "") {
      return true;
    } else return false;
  }
}
