import {Template} from '../../shared/models/template';

export const TEMPLATE_COLLECTION_PIPE = 'templateCollection';

export enum TemplateCollectionActions {
  GET_REQUEST = 'template-collection/GET_REQUEST',
  GET_SUCCESS = 'template-collection/GET_SUCCESS',
  GET_ERROR = 'template-collection/GET_ERROR',
}

export function templateCollectionReducer(state: Template = null, action: any) {
  switch (action.type) {
    case TemplateCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case TemplateCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
