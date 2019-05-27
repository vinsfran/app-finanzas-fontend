import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Login} from '../models/login.model';
import {InvalidateToken} from '../models/invalidateToken.model';
import {ConfigService} from './config.service';
import {TokenAppId} from '../models/tokenAppId.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  readonly rootUrl = '/api/jwt/';

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.headers = new HttpHeaders();
  }

  // getToken(userName: string, password: string) {
  //   const login: Login = {
  //     app_id: this.configService.get().appId,
  //     username: userName,
  //     password: password
  //   };
  //   this.headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.rootUrl + 'token', login, {headers: this.headers});
  // }
  //
  // verifyToken() {
  //   const tokenAppId: TokenAppId = {
  //     app_id: this.configService.get().appId,
  //     token: localStorage.getItem('token')
  //   };
  //   this.headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.rootUrl + 'verify', tokenAppId, {headers: this.headers});
  // }
  //
  // invalidateToken() {
  //   const invalidateToken: InvalidateToken = {
  //     app_id: this.configService.get().appId,
  //     token: localStorage.getItem('token')
  //   };
  //   this.headers.append('Content-Type', 'application/json; charset=utf-8');
  //   return this.http.post(this.rootUrl + 'invalidate', invalidateToken, {headers: this.headers});
  // }
}
