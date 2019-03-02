import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {CategoryActions} from "../reducers/category.reducer";
import {Category} from "../../shared/models/category";

@Injectable()
export class CategoryEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(CategoryActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<Category>(ApiEndpointEnum.categories, action.payload).pipe(
        map(data => ({type: CategoryActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: CategoryActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
