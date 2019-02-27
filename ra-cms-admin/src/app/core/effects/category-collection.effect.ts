import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {categoryCollectionActions} from "../reducers/category-collection.reducer";
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class CategoryCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(categoryCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get(ApiEndpointEnum.categories).pipe(
        map(data => ({type: categoryCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: categoryCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
