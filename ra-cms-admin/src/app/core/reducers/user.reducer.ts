import {Article} from '../../shared/models/article';

export const userActions = {
  GET_REQUEST: 'user/GET_REQUEST',
  GET_SUCCESS: 'user/GET_SUCCESS',
  GET_ERROR: 'user/GET_ERROR',
};

export function userReducer(state: Article = null, action: any) {
  switch (action.type) {
    case userActions.GET_SUCCESS:
      return action.payload.data;
    case userActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
