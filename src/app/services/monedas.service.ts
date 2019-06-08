import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MonedaModel} from '../components/modulos/monedas/moneda.model';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';


@Injectable()
export class MonedasService {

  private urlEndPoint: string = '/api/monedas';

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
  //     this.router.navigate(['/monedas']);
  //     return true;
  //   }
  //   return false;
  // }

  // getRegiones(): Observable<Region[]> {
  //   return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  // }

  getAll() {
    // return of(CLIENTES);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<MonedaModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getMonedas(page: number, size: number, campo: string, orden: string) {
    // return of(CLIENTES);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});

  }

  create(moneda: MonedaModel): Observable<MonedaModel> {
    // return this.http.post<Moneda>(this.urlEndPoint, moneda, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.post<MonedaModel>(this.urlEndPoint, moneda).pipe(
      map((response: any) => response.moneda as MonedaModel),
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

  getMoneda(id): Observable<MonedaModel> {
    // return this.http.get<Moneda>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<MonedaModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/monedas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(moneda: MonedaModel): Observable<any> {
    // return this.http.put<any>(`${this.urlEndPoint}/${moneda.id}`, moneda, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.put<any>(`${this.urlEndPoint}/${moneda.id}`, moneda).pipe(
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

  delete(id: number): Observable<MonedaModel> {
    // return this.http.delete<Moneda>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.delete<MonedaModel>(`${this.urlEndPoint}/${id}`).pipe(
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
