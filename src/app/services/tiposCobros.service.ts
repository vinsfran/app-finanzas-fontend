import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';
import {TipoCobroModel} from '../components/modulos/tiposCobros/tipoCobro.model';


@Injectable()
export class TiposCobrosService {

  readonly urlEndPoint = '/api/tipoCobros';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  // private agregarAuthorizarionHeader() {
  //   const token = this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   return this.httpHeaders;
  // }

  // private isNoAutorizado(e): boolean {
  //   if (e.status === 401) {
  //
  //     if (this.authService.isAuthenticated()) {
  //       this.authService.logout();
  //     }
  //
  //     this.router.navigate(['/login']);
  //     return true;
  //   }
  //
  //   if (e.status === 403) {
  //     swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username}, no tienes acceso a este recurso!`, 'warning');
  //     this.router.navigate(['/tipoCobros']);
  //     return true;
  //   }
  //   return false;
  // }

  // getRegiones(): Observable<Region[]> {
  //   return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  // }

  getAll(): Observable<TipoCobroModel[]> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<TipoCobroModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getTiposCobros(page: number, size: number, campo: string, orden: string) {
    // return of(CLIENTES);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});

  }

  create(tipoCobro: TipoCobroModel): Observable<TipoCobroModel> {
    // return this.http.post<TiposCobro>(this.urlEndPoint, tipoCobro, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.post<TipoCobroModel>(this.urlEndPoint, tipoCobro).pipe(
      map((response: any) => response.tipoCobro as TipoCobroModel),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getTipoCobro(id): Observable<TipoCobroModel> {
    // return this.http.get<TiposCobro>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<TipoCobroModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/tipos-cobros']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(tipoCobro: TipoCobroModel): Observable<any> {
    // return this.http.put<any>(`${this.urlEndPoint}/${tipoCobro.id}`, tipoCobro, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.put<any>(`${this.urlEndPoint}/${tipoCobro.id}`, tipoCobro).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<TipoCobroModel> {
    // return this.http.delete<TiposCobro>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.delete<TipoCobroModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

}
