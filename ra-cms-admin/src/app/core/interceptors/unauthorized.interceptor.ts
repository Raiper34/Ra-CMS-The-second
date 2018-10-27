import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

const UNAUTHORIZED_STATUS = 401;

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === UNAUTHORIZED_STATUS && this.router.url !== '/' && !this.router.url.includes('/public')) {
          this.router.navigate(['/public']);
        }
        return throwError(error);
      })
    );
  }
}
