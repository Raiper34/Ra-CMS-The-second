import {Base} from './base';
import {Article} from './article';

export interface Site extends Base{
  name: string;
  homepage_id: Article;
  not_found_id: Article;
}
