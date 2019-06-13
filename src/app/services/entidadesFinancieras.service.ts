import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EntidadFinancieraModel} from '../components/modulos/entidadesFinancieras/entidadFinanciera.model';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';


@Injectable()
export class EntidadesFinancierasService {

  readonly urlEndPoint = '/api/entidadesFinancieras';

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
  //     this.router.navigate(['/entidadesFinancieras']);
  //     return true;
  //   }
  //   return false;
  // }

  // getRegiones(): Observable<Region[]> {
  //   return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  // }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<EntidadFinancieraModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getEntidadesFinancieras(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(entidadFinanciera: EntidadFinancieraModel): Observable<EntidadFinancieraModel> {
    // return this.http.post<EntidadFinanciera>(this.urlEndPoint, entidadFinanciera, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.post<EntidadFinancieraModel>(this.urlEndPoint, entidadFinanciera).pipe(
      map((response: any) => response.entidadFinanciera as EntidadFinancieraModel),
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

  getEntidadFinanciera(id): Observable<EntidadFinancieraModel> {
    // return this.http.get<EntidadFinanciera>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<EntidadFinancieraModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/entidadesFinancieras']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(entidadFinanciera: EntidadFinancieraModel): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${entidadFinanciera.id}`, entidadFinanciera).pipe(
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

  delete(id: number): Observable<EntidadFinancieraModel> {
    // return this.http.delete<EntidadFinanciera>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.delete<EntidadFinancieraModel>(`${this.urlEndPoint}/${id}`).pipe(
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
