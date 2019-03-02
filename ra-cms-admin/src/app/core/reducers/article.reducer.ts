import {Article} from '../../shared/models/article';

export const ARTICLE_PIPE = 'article';

export enum ArticleActions {
  GET_REQUEST = 'article/GET_REQUEST',
  GET_SUCCESS = 'article/GET_SUCCESS',
  GET_ERROR = 'article/GET_ERROR',
};

export function articleReducer(state: Article = null, action: any) {
  switch (action.type) {
    case ArticleActions.GET_SUCCESS:
      return action.payload.data;
    case ArticleActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
