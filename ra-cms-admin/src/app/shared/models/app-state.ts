import {Article} from './article';

export interface AppState {
  article: Article;
  articleCollection: Article[],
}
