import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthorizationGuard} from '../authorization/authorization.guard';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private authorizationGuard: AuthorizationGuard) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('INTER ' + JSON.stringify(this.authorizationGuard.controlSession()));
    // FALTA RESOLVER REDIRECCION A authorizationGuard.controlSession()
    // console.log('INTER ' + JSON.stringify(req));

    return next.handle(req);
  }

}
