import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {userCollectionActions} from '../reducers/user-collection.reducer';

@Injectable()
export class UserCollectionEffect {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(userCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get('users').pipe(
        map(data => ({type: userCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: userCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
