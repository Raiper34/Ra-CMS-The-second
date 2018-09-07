import {Article} from '../models/article';

export const articleCollectionActions = {
  GET_REQUEST: 'article-collection/GET_REQUEST',
  GET_SUCCESS: 'article-collection/GET_SUCCESS',
  GET_ERROR: 'article-collection/GET_ERROR',
};

export function articleCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case articleCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case articleCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
