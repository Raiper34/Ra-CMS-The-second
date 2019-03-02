import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {SiteActions} from '../reducers/site.reducer';
import {Site} from "../../shared/models/site";

@Injectable()
export class SiteEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(SiteActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<Site>(ApiEndpointEnum.site).pipe(
        map(data => ({type: SiteActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: SiteActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
