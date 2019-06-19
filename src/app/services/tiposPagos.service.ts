import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';
import {TipoPagoModel} from '../components/modulos/tiposPagos/tipoPago.model';


@Injectable()
export class TiposPagosService {

  readonly urlEndPoint = '/api/tipos-pagos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<TipoPagoModel[]>(
      this.urlEndPoint + '/', {headers: this.httpHeaders});
  }

  getPage(page: number, size: number, campo: string, orden: string) {
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

  get(id): Observable<TipoPagoModel> {
    // return this.http.get<TiposPago>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizarionHeader()}).pipe(
    return this.http.get<TipoPagoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/tipos-pagos']);
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
