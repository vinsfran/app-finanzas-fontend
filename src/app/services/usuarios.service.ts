import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UsuarioModel} from '../models/usuario.model';


@Injectable()
export class UsuariosService {

  readonly urlEndPoint = '/api/usuarios';

  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {
  }


  getUsuario(username: string): Observable<UsuarioModel> {
    // return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<UsuarioModel>(`${this.urlEndPoint}/${username}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          // this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


}
