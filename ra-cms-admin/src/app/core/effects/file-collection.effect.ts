import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {FileCollectionActions} from '../reducers/file-collection.reducer';
import {File} from "../../shared/models/file";

@Injectable()
export class FileCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(FileCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<File[]>(ApiEndpointEnum.files).pipe(
        map(data => ({type: FileCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: FileCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
