import {Article} from '../../shared/models/article';

export const FILE_COLLECTION_PIPE = 'fileCollection';

export enum FileCollectionActions {
  GET_REQUEST = 'fileCollection/GET_REQUEST',
  GET_SUCCESS = 'fileCollection/GET_SUCCESS',
  GET_ERROR = 'fileCollection/GET_ERROR',
};

export function fileCollectionReducer(state: Article = null, action: any) {
  switch (action.type) {
    case FileCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case FileCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
