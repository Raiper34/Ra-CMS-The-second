import {TemplatePage} from '../../shared/models/template-page';


export const TEMPLATE_PAGE_COLLECTION_PIPE = 'templatePageCollection';

export enum TemplatePageCollectionActions {
  GET_REQUEST = 'template-page-collection/GET_REQUEST',
  GET_SUCCESS = 'template-page-collection/GET_SUCCESS',
  GET_ERROR = 'template-page-collection/GET_ERROR',
}

export function templatePageCollectionReducer(state: TemplatePage = null, action: any) {
  switch (action.type) {
    case TemplatePageCollectionActions.GET_SUCCESS:
      return action.payload.data;
    case TemplatePageCollectionActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
