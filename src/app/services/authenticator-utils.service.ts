import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorUtilsService implements OnInit {

  readonly rootUrl = '/api/utils/';

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.headers = new HttpHeaders();
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  // getPermisos() {
  //   const tokenAppId: TokenAppId = {
  //     app_id: this.configService.get().appId,
  //     token: localStorage.getItem('token')
  //   };
  //   this.headers.append('accept', 'application/json; charset=utf-8');
  //   return this.http.post(this.rootUrl + 'tokenToPermisos', tokenAppId, {headers: this.headers});
  // }
}
