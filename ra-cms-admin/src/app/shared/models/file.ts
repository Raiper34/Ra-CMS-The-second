import {Base} from './base';

export interface File extends Base{
  id: number;
  name: string;
  extension: string;
  url: string;
  path: string;
  type: string;
}
