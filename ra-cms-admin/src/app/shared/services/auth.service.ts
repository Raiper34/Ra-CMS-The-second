import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService, ENDPOINT} from './api.service';
import {tap} from 'rxjs/operators';
import {Auth} from '../models/auth';

const CLIENT_ID = 1;
const CLIENT_SECRET = 'racms-secret';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private api: ApiService) { }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(`${ENDPOINT}/oauth/token`, {
      username,
      password,
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: '',
    }).pipe(tap((data: Auth) => this.api.setHeaders(`${data.token_type} ${data.access_token}`)));
  }
}
