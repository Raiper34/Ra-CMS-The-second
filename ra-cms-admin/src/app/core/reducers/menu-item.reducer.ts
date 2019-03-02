import {MenuItem} from "../../shared/models/menu-item";

export const MENU_ITEM_PIPE = 'menuItem';

export enum MenuItemActions {
  GET_REQUEST = 'menuItem/GET_REQUEST',
  GET_SUCCESS = 'menuItem/GET_SUCCESS',
  GET_ERROR = 'menuItem/GET_ERROR',
};

export function menuItemReducer(state: MenuItem = null, action: any) {
  switch (action.type) {
    case MenuItemActions.GET_SUCCESS:
      return action.payload.data;
    case MenuItemActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
