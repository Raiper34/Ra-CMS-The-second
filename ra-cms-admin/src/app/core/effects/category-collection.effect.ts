import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {CategoryCollectionActions} from "../reducers/category-collection.reducer";
import {Category} from "../../shared/models/category";

@Injectable()
export class CategoryCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(CategoryCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<Category[]>(ApiEndpointEnum.categories).pipe(
        map(data => ({type: CategoryCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: CategoryCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
