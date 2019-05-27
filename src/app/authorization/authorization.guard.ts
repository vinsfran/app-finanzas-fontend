import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SiacwebBackendSessionService} from '../services/siacweb-backend/siacweb-backend-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  private acceso: boolean;

  constructor(private router: Router, private siacwebBackendSessionService: SiacwebBackendSessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.controlSession();
    return this.acceso;
  }

  controlSession() {
    if (localStorage.getItem('sessionId') != null) {
      this.acceso = true;
    } else {
      this.acceso = false;
      this.router.navigate(['login']);
    }

    // return this.siacwebBackendSessionService.istoken().pipe(
    //   map(data => {
    //
    //     if (data.status) {
    //       this.siacwebBackendSessionService.setLoggedInStatus(true);
    //       return true;
    //     } else {
    //       this.siacwebBackendSessionService.setLoggedInStatus(false);
    //       this.router.navigate(['login']);
    //       return false;
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.router.navigate(['login']);
    //     swal.fire('Error al obtener el Menu', err.message, 'error');
    //
    //     return false;
    //   }));

    // this.acceso = false;
    // this.siacwebBackendSessionService.istoken().subscribe(data => {
    //     if (data.status) {
    //       this.siacwebBackendSessionService.setLoggedInStatus(true);
    //       this.acceso = true;
    //     } else {
    //       this.siacwebBackendSessionService.setLoggedInStatus(false);
    //       this.router.navigate(['login']);
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.router.navigate(['login']);
    //   });
  }
}
