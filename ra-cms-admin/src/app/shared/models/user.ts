import {Base} from './base';

export interface User extends Base {
  id: number;
  name: string;
  email: string;
}
