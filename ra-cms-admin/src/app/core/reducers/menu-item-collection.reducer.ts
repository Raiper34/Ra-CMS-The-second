import {Article} from '../../shared/models/article';

export const MENU_ITEM_COLLECTION_PIPE = 'menuItemCollection';

export enum MenuItemCollectionActions {
  GET_REQUEST = 'menu-item-collection/GET_REQUEST',
  GET_SUCCESS = 'menu-item-collection/GET_SUCCESS',
  GET_ERROR = 'menu-item-collection/GET_ERROR',
};

export function menuItemCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case MenuItemCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case MenuItemCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
