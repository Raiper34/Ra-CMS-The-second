import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {UserActions} from '../reducers/user.reducer';
import {User} from "../../shared/models/user";

@Injectable()
export class UserEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<User>(ApiEndpointEnum.user).pipe(
        map(data => ({type: UserActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: UserActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
