import {Base} from './base';

export interface MenuItem extends Base {
  title: string;
  article_id: number;
  order: number;
}
