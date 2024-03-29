import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private api: ApiService,
              private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return  this.api.get(ApiEndpointEnum.user).pipe(
      map(() => {
        this.router.navigate(['/protected']);
        return false;
      }),
      catchError(() => of(true)),
    );
  }
}
