import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export const ENDPOINT = 'http://127.0.0.1:8000';
export const API_ENDPOINT = `${ENDPOINT}/api`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(resource: string, id: number = null): Observable<Object> {
    return this.http.get(`${API_ENDPOINT}/${resource}${id ? '/' + id : ''}`);
  }

  post(resource: string, data: Object): Observable<Object> {
    return this.http.post(`${API_ENDPOINT}/${resource}`, data);
  }

  put(resource: string, id: number, data: Object): Observable<Object> {
    return this.http.put(`${API_ENDPOINT}/${resource}/${id}`, data);
  }

  delete(resource: string, id: number): Observable<Object> {
    return this.http.delete(`${API_ENDPOINT}/${resource}/${id}`);
  }

}
