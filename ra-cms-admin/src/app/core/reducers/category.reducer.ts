import {Category} from "../../shared/models/category";

export const categoryActions = {
  GET_REQUEST: 'category/GET_REQUEST',
  GET_SUCCESS: 'category/GET_SUCCESS',
  GET_ERROR: 'category/GET_ERROR',
};

export function categoryReducer(state: Category = null, action: any) {
  switch (action.type) {
    case categoryActions.GET_SUCCESS:
      return action.payload.data;
    case categoryActions.GET_ERROR:
      return null;
    default:
      return state;
  }
}
