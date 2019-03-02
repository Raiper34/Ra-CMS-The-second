import {Article} from '../../shared/models/article';

export const FILE_PIPE = 'file';

export enum FileActions {
  GET_REQUEST = 'file/GET_REQUEST',
  GET_SUCCESS = 'file/GET_SUCCESS',
  GET_ERROR = 'file/GET_ERROR',
};

export function fileReducer(state: Article = null, action: any) {
  switch (action.type) {
    case FileActions.GET_SUCCESS:
      return {...action.payload.data};
    case FileActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
