import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PrestamoModel} from '../components/modulos/prestamos/prestamo.model';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';
import {PrestamoPagoModel} from '../components/modulos/prestamosPagos/prestamoPago.model';


@Injectable()
export class PrestamosPagosService {

  readonly urlEndPoint = '/api/prestamos-pagos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<PrestamoModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getPage(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(prestamoPagoModel: PrestamoPagoModel): Observable<PrestamoPagoModel> {
    return this.http.post<PrestamoPagoModel>(this.urlEndPoint, prestamoPagoModel).pipe(
      map((response: any) => response.prestamoPago as PrestamoPagoModel),
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

  get(id: number): Observable<PrestamoPagoModel> {
    return this.http.get<PrestamoPagoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/prestamos-pagos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(prestamoPagoModel: PrestamoPagoModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, prestamoPagoModel).pipe(
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

  delete(id: number): Observable<PrestamoPagoModel> {
    return this.http.delete<PrestamoPagoModel>(`${this.urlEndPoint}/${id}`).pipe(
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
