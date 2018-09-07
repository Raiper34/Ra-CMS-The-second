import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService, ENDPOINT} from './api.service';
import {tap} from 'rxjs/operators';
import {Auth} from '../models/auth';

const CLIENT_ID = 1;
const CLIENT_SECRET = 'racms-secret';
const TOKEN_STORAGE = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.token = localStorage.getItem(TOKEN_STORAGE);
  }

  getToken(): string {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_STORAGE);
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(`${ENDPOINT}/oauth/token`, {
      username,
      password,
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: '',
    }).pipe(tap((data: Auth) => {
      this.token = `${data.token_type} ${data.access_token}`;
      localStorage.setItem(TOKEN_STORAGE, this.token);
    }));
  }
}
