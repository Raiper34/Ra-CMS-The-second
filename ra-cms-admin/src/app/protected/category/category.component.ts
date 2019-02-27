import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app-state";
import {ApiService} from "../../core/services/api.service";
import {MzToastService} from "ngx-materialize";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {TableRow} from "../../shared/components/table/table-row";
import {Table} from "../../shared/components/table/table";
import {DeleteModalComponent} from "../../shared/components/modal/delete-modal/delete-modal.component";
import {TableColumn} from "../../shared/components/table/table-column";
import {TableAction} from "../../shared/components/table/table-action";
import {categoryCollectionActions} from "../../core/reducers/category-collection.reducer";
import {Category} from "../../shared/models/category";
import {MenuEditModalComponent} from "../menu/menu-edit-modal/menu-edit-modal.component";

const TABLE_HEAD: TableColumn[] = [
  {title: 'Name', name: 'name'},
];

const TABLE_ACTIONS: TableAction[] = [
  {name: 'Edit', id: 'openEditModal'},
  {name: 'Delete', id: 'openDeleteModal', warning: true},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild('modal') modal: DeleteModalComponent;
  @ViewChild('modalEdit') modalEdit: MenuEditModalComponent;
  $tableData: Observable<Table>;

  constructor(private store: Store<AppState>,
              private api: ApiService,
              private toastService: MzToastService,
              private router: Router) { }

  ngOnInit() {
    this.$tableData = this.store.pipe(
      select('categoryCollection'),
      switchMap((items: Category[]) => {
        return of({
          head: TABLE_HEAD,
          data: items ? items.map(item => ({...item} as TableRow)) : [],
          actions: TABLE_ACTIONS,
        });
      }),
    );
    this.store.dispatch({type: categoryCollectionActions.GET_REQUEST});
  }

  tableAction(action: TableAction): void {
    this[action.id](action.row.id);
  }

  openEditModal(id?: number): void {
    this.modalEdit.openModal(id)
  }

  submit(category: Category): void {
    if (category.id) {
      this.edit(category);
    } else {
      this.create(category);
    }
  }

  private edit(category: Category): void {
    this.api.put('categories', category.id, category).subscribe(() => {
        this.store.dispatch({type: categoryCollectionActions.GET_REQUEST});
        this.toastService.show(`Category ${category.name} was edited successful`, 4000, 'green');
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  private create(category: Category): void {
    this.api.post('categories', category).subscribe(() => {
        this.store.dispatch({type: categoryCollectionActions.GET_REQUEST});
        this.toastService.show(`Category ${category.name} was created successful`, 4000, 'green');
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  delete(id: number): void {
    this.api.delete('categories', id).subscribe(() => {
      this.store.dispatch({type: categoryCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

  openDeleteModal(id: number): void {
    this.modal.openModal(id);
  }

}
