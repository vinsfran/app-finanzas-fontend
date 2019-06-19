import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable()
export class DashboardService {

  readonly urlEndPoint = '/api/dashboard';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
  }

  get() {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(
      this.urlEndPoint, {headers: this.httpHeaders});
  }

}
