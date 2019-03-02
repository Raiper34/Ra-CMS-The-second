import {Category} from "../../shared/models/category";

export const CATEGORY_COLLECTION_PIPE = 'categoryCollection';

export enum CategoryCollectionActions {
  GET_REQUEST = 'category-collection/GET_REQUEST',
  GET_SUCCESS = 'category-collection/GET_SUCCESS',
  GET_ERROR = 'category-collection/GET_ERROR',
};

export function categoryCollectionReducer(state: Category = null, action: any) {
  switch (action.type) {
    case CategoryCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case CategoryCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
