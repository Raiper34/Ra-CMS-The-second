import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export const ENDPOINT = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('Authorization');
    if (token) {
      this.headers = new HttpHeaders({Authorization: token});
    }
  }

  get(resource: string, id: string = null): Observable<Object> {
    return this.http.get(`${ENDPOINT}/${resource}${id ? '/' + id : ''}`, {headers: this.headers});
  }

  post(resource: string, data: Object): Observable<Object> {
    return this.http.post(`${ENDPOINT}/${resource}`, data, {headers: this.headers});
  }

  put(resource: string, id: string, data: Object): Observable<Object> {
    return this.http.put(`${ENDPOINT}/${resource}/${id}`, data, {headers: this.headers});
  }

  delete(resource: string, id: string): Observable<Object> {
    return this.http.delete(`${ENDPOINT}/${resource}/${id}`, {headers: this.headers});
  }

  setHeaders(token: string): void {
    localStorage.setItem('Authorization', token);
    this.headers = new HttpHeaders({Authorization: token});
  }

}
