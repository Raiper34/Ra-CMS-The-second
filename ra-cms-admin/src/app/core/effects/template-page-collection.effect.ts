import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {TemplatePageCollectionActions} from '../reducers/template-page-collection.reducer';
import {TemplatePage} from '../../shared/models/template-page';

@Injectable()
export class TemplatePageCollectionEffect {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatePageCollectionActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<TemplatePage[]>(ApiEndpointEnum.templatePages, action.payload).pipe(
        map(data => ({type: TemplatePageCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: TemplatePageCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
