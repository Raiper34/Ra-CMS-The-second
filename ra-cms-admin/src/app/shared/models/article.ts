import {Base} from './base';

export interface Article extends Base {
  title: string;
  content: string;
  description: string;
  keywords: string;
  url: string;
  category_id: number;
  included_category_id: number;
  template_page_id: number;
}
