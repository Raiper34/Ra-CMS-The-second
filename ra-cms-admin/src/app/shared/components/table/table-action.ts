import {TableRow} from './table-row';

export interface TableAction {
  name: string;
  id: string;
  warning?: boolean;
  row?: TableRow;
}
