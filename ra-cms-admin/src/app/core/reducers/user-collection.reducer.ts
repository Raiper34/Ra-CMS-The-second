import {Article} from '../../shared/models/article';

export const USER_COLLECTION_PIPE = 'userCollection';

export enum UserCollectionActions {
  GET_REQUEST ='userCollection/GET_REQUEST',
  GET_SUCCESS = 'userCollection/GET_SUCCESS',
  GET_ERROR = 'userCollection/GET_ERROR',
};

export function userCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case UserCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case UserCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
