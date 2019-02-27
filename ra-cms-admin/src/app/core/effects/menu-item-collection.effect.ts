import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {menuItemCollectionActions} from "../reducers/menu-item-collection.reducer";
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class MenuItemCollectionEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(menuItemCollectionActions.GET_REQUEST),
    mergeMap(() =>
      this.api.get(ApiEndpointEnum.menuItems).pipe(
        map(data => ({type: menuItemCollectionActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: menuItemCollectionActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
