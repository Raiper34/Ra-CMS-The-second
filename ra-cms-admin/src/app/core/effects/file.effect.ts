import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {fileActions} from '../reducers/file.reducer';
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class FileEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(fileActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get(ApiEndpointEnum.files, action.payload).pipe(
        map(data => ({type: fileActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: fileActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
