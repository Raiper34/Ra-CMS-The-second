import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Table} from './table';
import {TableRow} from './table-row';
import {TableAction} from './table-action';

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

  @Output()
  action: EventEmitter<TableAction> = new EventEmitter<TableAction>();

  constructor() { }

  ngOnInit() {
  }

  doAction(action: TableAction, row: TableRow): void {
    this.action.emit({...action, row});
  }

}
