import {Base} from './base';

export interface File extends Base{
  name: string;
  extension: string;
  url: string;
  path: string;
  type: string;
}
