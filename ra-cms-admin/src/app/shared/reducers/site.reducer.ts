import {Article} from '../models/article';

export const siteActions = {
  GET_REQUEST: 'site/GET_REQUEST',
  GET_SUCCESS: 'site/GET_SUCCESS',
  GET_ERROR: 'site/GET_ERROR',
};

export function siteReducer(state: Article = null, action: any) {
  switch (action.type) {
    case siteActions.GET_SUCCESS:
      return action.payload.data;
    case siteActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
