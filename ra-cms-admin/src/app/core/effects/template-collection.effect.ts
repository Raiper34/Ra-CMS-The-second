import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {Template} from '../../shared/models/template';
import {TemplateCollectionActions} from '../reducers/template-collection.reducer';

@Injectable()
export class TemplateCollectionEffect {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(TemplateCollectionActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<Template[]>(ApiEndpointEnum.templates, action.payload).pipe(
        map(data => ({type: TemplateCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: TemplateCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
