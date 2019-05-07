import {Article} from '../../shared/models/article';

export const SITE_PIPE = 'site';

export enum SiteActions {
  GET_REQUEST = 'site/GET_REQUEST',
  GET_SUCCESS = 'site/GET_SUCCESS',
  GET_ERROR = 'site/GET_ERROR',
}

export function siteReducer(state: Article = null, action: any) {
  switch (action.type) {
    case SiteActions.GET_SUCCESS:
      return action.payload.data;
    case SiteActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
