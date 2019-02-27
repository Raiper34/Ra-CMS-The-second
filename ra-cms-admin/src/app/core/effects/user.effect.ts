import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {userActions} from '../reducers/user.reducer';
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class UserEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get(ApiEndpointEnum.users, action.payload).pipe(
        map(data => ({type: userActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: userActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
