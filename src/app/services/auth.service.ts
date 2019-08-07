import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';
import {LoginModel} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: UsuarioModel;
  private _token: string;

  constructor(private http: HttpClient) {
  }

  public get usuario(): UsuarioModel {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioModel;
      return this._usuario;
    }
    return new UsuarioModel();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(loginModel: LoginModel): Observable<any> {
    // const urlEndpoint = 'http://localhost:8080/oauth/token';
    // const urlEndpoint = '/oauth/token';
    const urlEndpoint = '/auth/login';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      // 'Authorization': 'Basic ' + credenciales
    });

    const params = new URLSearchParams();
    // params.set('grant_type', 'password');
    // params.set('email', usuario.username);
    // params.set('password', usuario.password);
    console.log(JSON.stringify(loginModel));
    return this.http.post<any>(urlEndpoint, loginModel, {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    console.log(payload);
    this._usuario = new UsuarioModel();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
