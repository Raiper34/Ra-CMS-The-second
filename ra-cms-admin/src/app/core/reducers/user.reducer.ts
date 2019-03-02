import {Article} from '../../shared/models/article';

export const USER_PIPE = 'user';

export enum UserActions {
  GET_REQUEST = 'user/GET_REQUEST',
  GET_SUCCESS = 'user/GET_SUCCESS',
  GET_ERROR = 'user/GET_ERROR',
};

export function userReducer(state: Article = null, action: any) {
  switch (action.type) {
    case UserActions.GET_SUCCESS:
      return action.payload.data;
    case UserActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
