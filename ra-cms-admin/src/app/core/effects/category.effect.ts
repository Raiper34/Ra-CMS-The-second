import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {categoryActions} from "../reducers/category.reducer";
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class CategoryEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(categoryActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get(ApiEndpointEnum.categories, action.payload).pipe(
        map(data => ({type: categoryActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: categoryActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
