import {Base} from './base';
import {Article} from './article';

export interface Site extends Base{
  name: string;
  homepage: Article;
  notFound: Article;
}
