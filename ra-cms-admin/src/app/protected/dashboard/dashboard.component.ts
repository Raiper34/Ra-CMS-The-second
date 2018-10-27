import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Observable, of} from 'rxjs';
import {Table} from '../../shared/components/table/table';
import {TableAction} from '../../shared/components/table/table-action';
import {ModalAction} from '../../shared/components/modal/modal-action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tableData: Observable<Table> = of({
    head: [
      {title: 'Name', name: 'name'},
      {title: 'Title', name: 'title'},
    ],
    data: [
      {name: 'Filip', title: 'Ing', id: 1},
      {name: 'Marek', title: 'Mgr', id: 2},
    ],
    actions: [
      {name: 'Edit', id: 'edit', warning: true},
    ]
  });

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  tableAction(action: TableAction): void {
    console.log(action);
  }

  modalAction(action: ModalAction): void {
    console.log(action);
  }

  delete(): void {
    console.log('DELETE');
  }

}
