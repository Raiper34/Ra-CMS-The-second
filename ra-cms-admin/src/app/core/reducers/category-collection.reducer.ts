import {Category} from "../../shared/models/category";

export const categoryCollectionActions = {
  GET_REQUEST: 'category-collection/GET_REQUEST',
  GET_SUCCESS: 'category-collection/GET_SUCCESS',
  GET_ERROR: 'category-collection/GET_ERROR',
};

export function categoryCollectionReducer(state: Category = null, action: any) {
  switch (action.type) {
    case categoryCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case categoryCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
