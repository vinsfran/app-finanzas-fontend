import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../models/config.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly configUrl = 'assets/config.json';
  config: Config;

  constructor(private http: HttpClient) {
    this.config = new Config();
  }

  get(): Observable<Config> {
    return this.http.get<Config>(this.configUrl);
  }

  getConfig() {
    this.get().subscribe((data: Config) => {
      if (data != null) {
        this.config = data;
      }
    });
  }

  getAppId() {
    this.getConfig();
    return this.config.appId;
  }
}
