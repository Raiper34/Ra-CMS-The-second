import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

export const ENDPOINT = environment.publicUrl;
export const API_ENDPOINT = `${ENDPOINT}/api`;

export enum ApiEndpointEnum {
  articles = 'articles',
  categories = 'categories',
  files = 'files',
  menuItems = 'menu-items',
  site = 'site',
  user = 'user',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(resource: string, id: number = null): Observable<T> {
    return this.http.get<T>(`${API_ENDPOINT}/${resource}${id ? '/' + id : ''}`);
  }

  post<T>(resource: string, data: Object): Observable<T> {
    return this.http.post<T>(`${API_ENDPOINT}/${resource}`, data);
  }

  put<T>(resource: string, id: number, data: Object): Observable<T> {
    return this.http.put<T>(`${API_ENDPOINT}/${resource}/${id}`, data);
  }

  delete<T>(resource: string, id: number): Observable<T> {
    return this.http.delete<T>(`${API_ENDPOINT}/${resource}/${id}`);
  }

}
