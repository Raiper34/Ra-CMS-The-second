import {Article} from '../models/article';

export const fileCollectionActions = {
  GET_REQUEST: 'fileCollection/GET_REQUEST',
  GET_SUCCESS: 'fileCollection/GET_SUCCESS',
  GET_ERROR: 'fileCollection/GET_ERROR',
};

export function fileCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case fileCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case fileCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
