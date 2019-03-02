import {Article} from '../../shared/models/article';

export const ARTICLE_COLLECTION_PIPE = 'articleCollection';

export enum ArticleCollectionActions {
  GET_REQUEST = 'article-collection/GET_REQUEST',
  GET_SUCCESS = 'article-collection/GET_SUCCESS',
  GET_ERROR = 'article-collection/GET_ERROR',
};

export function articleCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case ArticleCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case ArticleCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
