import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ConceptoModel} from '../components/modulos/conceptos/concepto.model';
import {ResponseBasePageModel} from '../models/new/responseBasePage.model';


@Injectable()
export class ConceptosService {

  readonly urlEndPoint = '/api/conceptos';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ConceptoModel[]>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

  getConceptos(page: number, size: number, campo: string, orden: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<ResponseBasePageModel>(
      this.urlEndPoint + `/page?page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  create(concepto: ConceptoModel): Observable<ConceptoModel> {
    return this.http.post<ConceptoModel>(this.urlEndPoint, concepto).pipe(
      map((response: any) => response.concepto as ConceptoModel),
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

  getConcepto(id: number): Observable<ConceptoModel> {
    return this.http.get<ConceptoModel>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/conceptos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(concepto: ConceptoModel): Observable<any> {
    return this.http.put<any>(this.urlEndPoint, concepto).pipe(
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

  delete(id: number): Observable<ConceptoModel> {
    return this.http.delete<ConceptoModel>(`${this.urlEndPoint}/${id}`).pipe(
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
