import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {articleActions} from '../reducers/article.reducer';
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class ArticleEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(articleActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get(ApiEndpointEnum.articles, action.payload).pipe(
        map(data => ({type: articleActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: articleActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
