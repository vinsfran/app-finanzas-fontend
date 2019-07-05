import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TarjetaModel} from '../components/modulos/tarjetas/tarjeta.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';


@Injectable()
export class TarjetasService {

  readonly urlEndPoint = '/api/tarjetas';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<TarjetaModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getTarjetas(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(tarjeta: TarjetaModel): Observable<TarjetaModel> {
    return this.http.post<TarjetaModel>(this.urlEndPoint, tarjeta).pipe(
      map((response: any) => response.tarjeta as TarjetaModel),
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

  getTarjeta(id: number): Observable<TarjetaModel> {
    return this.http.get<TarjetaModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/tarjetas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(tarjeta: TarjetaModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, tarjeta).pipe(
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

  delete(id: number): Observable<TarjetaModel> {
    return this.http.delete<TarjetaModel>(`${this.urlEndPoint}/${id}`).pipe(
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
