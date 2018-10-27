import {TableColumn} from './table-column';
import {TableRow} from './table-row';
import {TableAction} from './table-action';

export interface Table {
  head: TableColumn[];
  data: TableRow[];
  actions?: TableAction[];
}
