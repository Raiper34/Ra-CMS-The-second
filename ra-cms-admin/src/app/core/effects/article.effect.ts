import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {ArticleActions} from '../reducers/article.reducer';
import {Article} from "../../shared/models/article";

@Injectable()
export class ArticleEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(ArticleActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<Article>(ApiEndpointEnum.articles, action.payload).pipe(
        map(data => ({type: ArticleActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: ArticleActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
