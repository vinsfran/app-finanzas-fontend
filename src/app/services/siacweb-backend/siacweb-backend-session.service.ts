import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {UserNamePasswordAppIdModel} from '../../models/new/userNamePasswordAppId.model';
import {ResponseBaseLoginModel} from '../../models/new/responseBaseLogin.model';
import {SessionIdModel} from '../../models/new/sessionId.model';
import {ResponseBaseUserModel} from '../../models/new/responseBaseUser.model';
import {ResponseBaseModel} from '../../models/new/responseBase.model';
import {ResponseBasePermisosModel} from '../../models/new/responseBasePermisos.model';

@Injectable({
  providedIn: 'root'
})
export class SiacwebBackendSessionService {

  readonly rootUrl = '/siacweb-backend/api/session/';

  private headers: HttpHeaders;
  private loggedInStatus = false;
  private _permisos: string[];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  login(userNamePasswordAppIdModel: UserNamePasswordAppIdModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseLoginModel>(this.rootUrl + 'login', userNamePasswordAppIdModel, {headers: this.headers});
  }

  getUser(sessionIdModel: SessionIdModel): Observable<ResponseBaseUserModel> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseUserModel>(this.rootUrl + 'getUserData', sessionIdModel, {headers: this.headers});
  }

  logout(sessionIdModel: SessionIdModel): Observable<ResponseBaseModel> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseModel>(this.rootUrl + 'logout', sessionIdModel, {headers: this.headers});
  }

  setLoggedInStatus(loggedInStatus: boolean) {
    this.loggedInStatus = loggedInStatus;
  }

  getUserAuthorizations(): Observable<ResponseBasePermisosModel> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBasePermisosModel>(this.rootUrl + 'getUserAuthorizations', sessionIdModel, {headers: this.headers});
  }

  // isAuthorized(sessionIdPermissionModel: SessionIdPermissionModel): Observable<ResponseBaseModel> {
  //   this.headers.append('Content-Type', 'application/json');
  //   return this.http.post<ResponseBaseModel>(this.rootUrl + 'isauthorized', sessionIdPermissionModel, {headers: this.headers});
  // }

  isAuthorized(permiso: string): boolean {
    let pemitido: boolean = false;
    this._permisos = JSON.parse(localStorage.getItem('permisos')) as Array<string>;
    if (this._permisos.includes(permiso)) {
      pemitido = true;
    }
    return pemitido;
  }

  istoken(): Observable<ResponseBaseModel> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseModel>(this.rootUrl + 'istoken', sessionIdModel, {headers: this.headers});
  }

  getTokenAppId(sessionIdModel: SessionIdModel): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', sessionIdModel, {headers: this.headers});
  }


  get isLoggedInStatus() {
    return this.loggedInStatus;
  }

  // getConf() {
  //   this.configService.getConfig()
  //     .subscribe((data: Config) => {
  //       this.config = data;
  //       localStorage.setItem('appId', this.config.appId);
  //     });
  //
  // }
}
