import {Article} from '../../shared/models/article';

export const articleActions = {
  GET_REQUEST: 'article/GET_REQUEST',
  GET_SUCCESS: 'article/GET_SUCCESS',
  GET_ERROR: 'article/GET_ERROR',
};

export function articleReducer(state: Article = null, action: any) {
  switch (action.type) {
    case articleActions.GET_SUCCESS:
      return action.payload.data;
    case articleActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
