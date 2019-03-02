import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {FileActions} from '../reducers/file.reducer';
import {File} from "../../shared/models/file";

@Injectable()
export class FileEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(FileActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<File>(ApiEndpointEnum.files, action.payload).pipe(
        map(data => ({type: FileActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: FileActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
