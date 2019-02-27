import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {menuItemActions} from "../reducers/menu-item.reducer";
import {ApiEndpointEnum} from "../../shared/enums/api-endpoint.enum";

@Injectable()
export class MenuItemEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(menuItemActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get(ApiEndpointEnum.menuItems, action.payload).pipe(
        map(data => ({type: menuItemActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: menuItemActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) { }
}
