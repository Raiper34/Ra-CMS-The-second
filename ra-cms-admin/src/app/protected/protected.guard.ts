import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiService} from '../core/services/api.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProtectedGuard implements CanActivate {

  constructor(private api: ApiService,
              private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return  this.api.get('user').pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/public']);
        return of(false);
      }),
    );
  }
}
