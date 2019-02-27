import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {articleCollectionActions} from '../reducers/article-collection.reducer';
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class ArticleCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(articleCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get(ApiEndpointEnum.articles).pipe(
        map(data => ({type: articleCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: articleCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
