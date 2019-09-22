import {Base} from './base';

export interface Template extends Base {
  name: string;
  description: string;
  version: string;
  author: string;
  folder_name: string;
}
