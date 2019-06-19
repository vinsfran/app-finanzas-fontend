import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PresupuestoModel} from '../components/modulos/presupuestos/presupuesto.model';
import {ResponseBasePageModel} from '../components/modulos/widgets/responseBasePage.model';


@Injectable()
export class PresupuestosService {

  readonly urlEndPoint = '/api/presupuestos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<PresupuestoModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getPage(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(presupuesto: PresupuestoModel): Observable<PresupuestoModel> {
    return this.http.post<PresupuestoModel>(this.urlEndPoint, presupuesto).pipe(
      map((response: any) => response.presupuesto as PresupuestoModel),
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

  get(id: number): Observable<PresupuestoModel> {
    return this.http.get<PresupuestoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/presupuestos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(presupuesto: PresupuestoModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, presupuesto).pipe(
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

  delete(id: number): Observable<PresupuestoModel> {
    return this.http.delete<PresupuestoModel>(`${this.urlEndPoint}/${id}`).pipe(
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
