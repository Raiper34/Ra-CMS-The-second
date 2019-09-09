import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Table} from './table';
import {TableRow} from './table-row';
import {TableAction} from './table-action';
import {TableFile} from './table-file';

const IMAGE_EXTENSIONS = ['png', 'jpg', 'gif'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  $tableData: Observable<Table> = of({
    head: [],
    data: [],
    actions: [],
  });

  @Input()
  sortable: boolean;

  @Input() clickable: boolean;

  @Output()
  action: EventEmitter<TableAction> = new EventEmitter<TableAction>();

  @Output()
  clickRow: EventEmitter<TableRow> = new EventEmitter<TableRow>();

  @Output()
  sortTable: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

  options: { onUpdate: (event: { newIndex: number, oldIndex: number }) => void };

  constructor() {
  }

  ngOnInit() {
    this.options = {
      onUpdate: ({oldIndex, newIndex}: { oldIndex: number, newIndex: number }) => {
        if (typeof oldIndex !== 'undefined' && typeof newIndex !== 'undefined')
          this.sortTable.emit([oldIndex, newIndex]);
      }
    };
  }

  doAction(action: TableAction, row: TableRow): void {
    this.action.emit({...action, row});
  }

  onClick(row: TableRow): void {
    if (this.clickable) {
      this.clickRow.emit(row);
    }
  }

  isFile(value: string | number | TableFile): boolean {
    return !!(value && (value as TableFile).url);
  }

  getImage(value: TableFile): string {
    const extension = value.url.split('.').pop().toLowerCase();
    return IMAGE_EXTENSIONS.some(item => item === extension) ? value.url : `assets/flaticon/${extension}.png`;
  }

}
