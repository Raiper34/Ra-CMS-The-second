import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {MenuItemCollectionActions} from "../reducers/menu-item-collection.reducer";
import {MenuItem} from "../../shared/models/menu-item";

@Injectable()
export class MenuItemCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(MenuItemCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get<MenuItem[]>(ApiEndpointEnum.menuItems).pipe(
        map(data => ({type: MenuItemCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: MenuItemCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
