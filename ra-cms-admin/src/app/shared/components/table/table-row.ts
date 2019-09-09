import {TableFile} from './table-file';

export interface TableRow {
  id: number;
  [name: string]: string | number | TableFile;
}
