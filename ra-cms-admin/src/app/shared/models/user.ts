import {Base} from './base.model';

export interface User extends Base {
  id: number;
  name: string;
  email: string;
}
