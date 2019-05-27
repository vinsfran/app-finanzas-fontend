import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public myStorage = {};

  constructor() {
  }

  public get<T>(key: string): T {
    return <T> this.myStorage[key];
  }

  public set<T>(key: string, nuevo: T) {
    this.myStorage[key] = nuevo;
  }

  public pop<T>(key: string): T {
    const ret: T = <T> this.myStorage[key];
    if (ret) {
      delete this.myStorage[key];
    }
    return ret;
  }

  public has(key: string): boolean {
    return (this.myStorage[key] !== undefined);
  }

  public userCan(perm): boolean {
    const perms: string[] = (<any>this.myStorage)['perms'];
    if (perms) {
      return perms.includes(perm);
    }
    return false;
  }

  public userCanSomething(): boolean {
    const perms: string[] = (<any>this.myStorage)['perms'];
    if (perms && perms.length > 0) {
      return true;
    }
    return false;
  }

  public userCanEither(...permisos: string[]): boolean {
    const perms: string[] = (<any>this.myStorage)['perms'];
    if (perms && perms.length > 0) {
      return permisos.some(this.userCan, this);
    }
    return false;
  }
}
