import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodySessionIdMenuFormModel} from '../../models/new/bodySessionIdMenuForm.model';
import {ResponseBaseMenusModel} from '../../models/new/responseBaseMenus.model';
import {SessionIdModel} from '../../models/new/sessionId.model';
import {ResponseBasePageModel} from '../../models/new/responseBasePage.model';
import {ResponseBaseMenuModel} from '../../models/new/responseBaseMenu.model';


@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getMenus() {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseMenusModel>(this.rootUrl + 'getMenus', sessionIdModel, {headers: this.headers});
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string) {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBasePageModel>(
      this.rootUrl + `listByIdPadre?id_padre=${idPadre}&page=${page}&size=${size}&sort=${campo},${orden}`,
      sessionIdModel, {headers: this.headers});
  }

  getMenuById(id: number) {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseMenuModel>(this.rootUrl + `getMenuById?id=${id}`,
      sessionIdModel, {headers: this.headers});
  }

  create(menuFormModel: MenuFormModel) {
    const bodySessionIdMenuFormModel = new BodySessionIdMenuFormModel();
    bodySessionIdMenuFormModel.sessionId = localStorage.getItem('sessionId');
    bodySessionIdMenuFormModel.menu = menuFormModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `create`, bodySessionIdMenuFormModel,
      {headers: this.headers});
  }

  edit(menuFormModel: MenuFormModel) {
    const bodySessionIdMenuFormModel = new BodySessionIdMenuFormModel();
    bodySessionIdMenuFormModel.sessionId = localStorage.getItem('sessionId');
    bodySessionIdMenuFormModel.menu = menuFormModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `edit`, bodySessionIdMenuFormModel,
      {headers: this.headers});
  }

}
