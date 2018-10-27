import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {siteActions} from '../reducers/site.reducer';

@Injectable()
export class SiteEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(siteActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get('site').pipe(
        map(data => ({type: siteActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: siteActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
