import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { CampaignService } from './campaign.service';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { userError } from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: BehaviorSubject<any>;
  token: any;
  //SE CREA en el constructor un Objeto  del Servicio de Campaign para acceder a las funciones de esta
  constructor(private _http: HttpClient,
    private _userCamp: CampaignService) {
    this.user = new  BehaviorSubject<any>(null);
  }
  //https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      environment.sails_services_urlpath
      // this._http.get('http://localhost:1337/users').subscribe((res:any)=>{
      //   resolve(res.data);
      // },reject)

      this._http.get(environment.sails_services_urlpath +  '/users').subscribe((res: any) => {
        resolve(res.data);
      }, reject)
    })
  }

  singUp(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post(environment.sails_services_urlpath  + '/user/singUp', user).subscribe(res => {
        resolve(res);
      }, reject)
    })
  }

  login(user): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Url to call " + environment.sails_services_urlpath )
      this._http.post(environment.sails_services_urlpath + '/user/singIn', { email: user.email, password: user.password },
      ).subscribe(async (res: any) => {
        const expiresAt = moment().add(res.expiresIn, 'second');
        localStorage.setItem('id_token', res.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        //await this.getUserById();
        //console.log(localStorage.getItem('user_id'))
        resolve(res);
      }, error => {
        reject(error);
      })
    });
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("campaign_selected");
    this.user.next(null);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getUserById() {
    const jwt = new JwtHelperService();
    let token = jwt.decodeToken(localStorage.getItem('id_token'));
    let user_id = token._id;
    console.log(user_id);
    let idparams = new HttpParams();
    idparams.append('id', user_id);
    return this._http.get(environment.sails_services_urlpath +'/user/getUserById/_id?id=' + user_id,
      { params: idparams }).pipe(map((responseData: any) => {

        if (responseData.data) {
          console.log(responseData.data.name)
          let user = new User();
          user = responseData.data;
          return user;
        } else {
          return null;
        }
      }))
  }


  getUserByIdWithPromise(): Promise<User> {
    const jwt = new JwtHelperService();
    let token = jwt.decodeToken(localStorage.getItem('id_token'));
    let user_id = token._id;
    console.log("<------ Login user id ---->")
    console.log(user_id);
    let idparams = new HttpParams();
    idparams.append('id', user_id);
    return new Promise ((resolve, reject)=>{
      this._http.get(environment.sails_services_urlpath +  '/user/getUserById/_id?id=' + user_id,
      { params: idparams }).pipe(map((responseData: any) => {
        if (responseData.data) {
          // if (typeof(this.user) === 'undefined' || this.user === null)
          //     this.user = new User();
          console.log(responseData.data.name)
          return responseData.data;
        } else {
          return responseData;
        }
      })).toPromise()
      .then((result : any) => {
          resolve(result);
      })
      .catch(error=>{
          console.error(error);
          reject(error);
        })

    })


  }

  getMyUser(): Observable<any> {
    return this.getUserById();
  }

  getMyUserId(): string {
    if(localStorage.getItem('id_token')!==null){
      const jwt = new JwtHelperService();
      let token = jwt.decodeToken(localStorage.getItem('id_token'));
      let user_id = token._id;
      return user_id;
    }else{
      return '';
    }
  }
}
