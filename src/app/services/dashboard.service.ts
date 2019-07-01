import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {DashboardModel} from '../components/modulos/dashboard/dashboard.model';


@Injectable()
export class DashboardService {

  readonly urlEndPoint = '/api/dashboard';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  get(fechaDesde: string, fechaHasta: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(
      this.urlEndPoint + `?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`, {headers: this.httpHeaders});
  }

}
