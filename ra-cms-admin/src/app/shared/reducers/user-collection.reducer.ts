import {Article} from '../models/article';

export const userCollectionActions = {
  GET_REQUEST: 'userCollection/GET_REQUEST',
  GET_SUCCESS: 'userCollection/GET_SUCCESS',
  GET_ERROR: 'userCollection/GET_ERROR',
};

export function userCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case userCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case userCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
