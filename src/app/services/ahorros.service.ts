import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AhorroModel} from '../components/modulos/ahorros/ahorro.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';


@Injectable()
export class AhorrosService {

  readonly urlEndPoint = '/api/ahorros';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<AhorroModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getAhorros(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(ahorro: AhorroModel): Observable<AhorroModel> {
    return this.http.post<AhorroModel>(this.urlEndPoint, ahorro).pipe(
      map((response: any) => response.ahorro as AhorroModel),
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

  getAhorro(id: number): Observable<AhorroModel> {
    return this.http.get<AhorroModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/ahorros']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(ahorro: AhorroModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, ahorro).pipe(
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

  delete(id: number): Observable<AhorroModel> {
    return this.http.delete<AhorroModel>(`${this.urlEndPoint}/${id}`).pipe(
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
