import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Table} from './table';
import {TableRow} from './table-row';
import {TableAction} from './table-action';
import {debounceTime, take} from "rxjs/operators";

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

  @Output()
  action: EventEmitter<TableAction> = new EventEmitter<TableAction>();

  @Output()
  sortTable: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

  options: {onUpdate: (event: {newIndex: number, oldIndex: number}) => void};

  constructor() { }

  ngOnInit() {
    this.options = {
      onUpdate: ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        if (typeof oldIndex !== 'undefined' && typeof newIndex !== 'undefined')
          this.sortTable.emit([oldIndex, newIndex]);
      }
    };
  }

  doAction(action: TableAction, row: TableRow): void {
    this.action.emit({...action, row});
  }

}
