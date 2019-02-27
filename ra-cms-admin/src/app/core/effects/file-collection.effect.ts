import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {fileCollectionActions} from '../reducers/file-collection.reducer';
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class FileCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(fileCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get(ApiEndpointEnum.files).pipe(
        map(data => ({type: fileCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: fileCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
