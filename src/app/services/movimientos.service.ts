import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MovimientoModel} from '../components/modulos/movimientos/movimiento.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';


@Injectable()
export class MovimientosService {

  readonly urlEndPoint = '/api/movimientos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<MovimientoModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getPage(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(movimiento: MovimientoModel): Observable<MovimientoModel> {
    return this.http.post<MovimientoModel>(this.urlEndPoint, movimiento).pipe(
      map((response: any) => response.movimiento as MovimientoModel),
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

  get(id: number): Observable<MovimientoModel> {
    return this.http.get<MovimientoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/movimientos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(movimiento: MovimientoModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, movimiento).pipe(
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

  delete(id: number): Observable<MovimientoModel> {
    return this.http.delete<MovimientoModel>(`${this.urlEndPoint}/${id}`).pipe(
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

  getMovimientosPageByPrestamoId(page: number, size: number, campo: string, orden: string, prestamoId: number) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page/by-prestamo-id?prestamoId=${prestamoId}&page=${page}&size=${size}&sort=${campo},${orden}`,
      {headers: this.httpHeaders});
  }

  getMovimientosPageByAhorroId(page: number, size: number, campo: string, orden: string, ahorroId: number) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page/by-ahorro-id?ahorroId=${ahorroId}&page=${page}&size=${size}&sort=${campo},${orden}`,
      {headers: this.httpHeaders});
  }

  getMovimientosPageByTarjetaId(page: number, size: number, campo: string, orden: string, tarjetaId: number) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page/by-tarjeta-id?tarjetaId=${tarjetaId}&page=${page}&size=${size}&sort=${campo},${orden}`,
      {headers: this.httpHeaders});
  }

}
