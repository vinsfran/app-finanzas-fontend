import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  permisos: string[];

  constructor() {
    this.permisos = JSON.parse(localStorage.getItem('permisos'));
  }

  findPermiso(permiso: string) {
    for (let i = 0, len = this.permisos.length; i < len; i++) {
      if (permiso === this.permisos[i]) {
        return true;
      }
    }
    return false;
  }
}
