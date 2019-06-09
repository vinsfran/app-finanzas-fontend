import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PrestamoModel} from '../components/modulos/prestamos/prestamo.model';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';


@Injectable()
export class PrestamosService {

  readonly urlEndPoint = '/api/prestamos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<PrestamoModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getPrestamos(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(prestamo: PrestamoModel): Observable<PrestamoModel> {
    return this.http.post<PrestamoModel>(this.urlEndPoint, prestamo).pipe(
      map((response: any) => response.prestamo as PrestamoModel),
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

  getPrestamo(id: number): Observable<PrestamoModel> {
    return this.http.get<PrestamoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/prestamos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(prestamo: PrestamoModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, prestamo).pipe(
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

  delete(id: number): Observable<PrestamoModel> {
    return this.http.delete<PrestamoModel>(`${this.urlEndPoint}/${id}`).pipe(
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
