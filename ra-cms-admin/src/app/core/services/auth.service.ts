import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {tap} from 'rxjs/operators';
import {Auth} from '../../shared/models/auth';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.token = localStorage.getItem(environment.authTokenStorageKey);
  }

  getToken(): string {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem(environment.authTokenStorageKey);
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(`${environment.publicUrl}/oauth/token`, {
      username,
      password,
      grant_type: 'password',
      client_id: environment.passportClientId,
      client_secret: environment.passportClientSecret,
      scope: '',
    }).pipe(tap((data: Auth) => {
      this.token = `${data.token_type} ${data.access_token}`;
      localStorage.setItem(environment.authTokenStorageKey, this.token);
    }));
  }
}
