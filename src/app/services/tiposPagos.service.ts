import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';
import {TipoPagoModel} from '../components/modulos/tiposPagos/tipoPago.model';


@Injectable()
export class TiposPagosService {

  private urlEndPoint: string = 'http://localhost:8080/api/tipoPagos';

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
  //     this.router.navigate(['/tipoPagos']);
  //     return true;
  //   }
  //   return false;
  // }

  // getRegiones(): Observable<Region[]> {
  //   return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  // }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<TipoPagoModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getTiposPagos(page: number, size: number, campo: string, orden: string) {
    // return of(CLIENTES);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});

  }

  create(tipoPago: TipoPagoModel): Observable<TipoPagoModel> {
    // return this.http.post<TiposPago>(this.urlEndPoint, tipoPago, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.post<TipoPagoModel>(this.urlEndPoint, tipoPago).pipe(
      map((response: any) => response.tipoPago as TipoPagoModel),
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

  getTipoPago(id): Observable<TipoPagoModel> {
    // return this.http.get<TiposPago>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<TipoPagoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/tipos-cobros']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(tipoPago: TipoPagoModel): Observable<any> {
    // return this.http.put<any>(`${this.urlEndPoint}/${tipoPago.id}`, tipoPago, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.put<any>(`${this.urlEndPoint}/${tipoPago.id}`, tipoPago).pipe(
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

  delete(id: number): Observable<TipoPagoModel> {
    // return this.http.delete<TiposPago>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.delete<TipoPagoModel>(`${this.urlEndPoint}/${id}`).pipe(
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
