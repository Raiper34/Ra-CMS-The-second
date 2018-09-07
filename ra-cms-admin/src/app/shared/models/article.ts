import {Base} from './base.model';

export interface Article extends Base{
  id: number;
  title: string;
  content: string;
  description: string;
  keywords: string;
  url: string;
}
