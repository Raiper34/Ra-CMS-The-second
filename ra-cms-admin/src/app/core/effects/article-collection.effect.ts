import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {ArticleCollectionActions} from '../reducers/article-collection.reducer';
import {Article} from "../../shared/models/article";

@Injectable()
export class ArticleCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(ArticleCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<Article[]>(ApiEndpointEnum.articles).pipe(
        map(data => ({type: ArticleCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: ArticleCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
