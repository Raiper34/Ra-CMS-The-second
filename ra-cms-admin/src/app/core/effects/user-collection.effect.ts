import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {UserCollectionActions} from '../reducers/user-collection.reducer';
import {User} from "../../shared/models/user";

@Injectable()
export class UserCollectionEffect {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(UserCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<User[]>(ApiEndpointEnum.user).pipe(
        map(data => ({type: UserCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: UserCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
