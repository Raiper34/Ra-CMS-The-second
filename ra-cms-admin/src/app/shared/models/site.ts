import {Base} from './base';
import {Article} from './article';

export interface Site extends Base{
  id: number;
  name: string;
  homepage: Article;
  404: Article;
}
