import {Article} from '../../shared/models/article';

export const menuItemCollectionActions = {
  GET_REQUEST: 'menu-item-collection/GET_REQUEST',
  GET_SUCCESS: 'menu-item-collection/GET_SUCCESS',
  GET_ERROR: 'menu-item-collection/GET_ERROR',
};

export function menuItemCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case menuItemCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case menuItemCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
