import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiEndpointEnum, ApiService} from '../services/api.service';
import {MenuItemActions} from "../reducers/menu-item.reducer";
import {MenuItem} from "../../shared/models/menu-item";

@Injectable()
export class MenuItemEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(MenuItemActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get<MenuItem>(ApiEndpointEnum.menuItems, action.payload).pipe(
        map(data => ({type: MenuItemActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: MenuItemActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
