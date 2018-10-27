import {Base} from './base';

export interface Article extends Base{
  title: string;
  content: string;
  description: string;
  keywords: string;
  url: string;
}
