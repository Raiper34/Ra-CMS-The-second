import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuEditModalComponent} from "./menu-edit-modal/menu-edit-modal.component";
import {TableColumn} from "../../shared/components/table/table-column";
import {TableAction} from "../../shared/components/table/table-action";
import {Observable, of} from "rxjs";
import {Table} from "../../shared/components/table/table";
import {select, Store} from "@ngrx/store";
import {switchMap, take} from "rxjs/operators";
import {Article} from "../../shared/models/article";
import {TableRow} from "../../shared/components/table/table-row";
import {AppState} from "../../shared/models/app-state";
import {MENU_ITEM_COLLECTION_PIPE, MenuItemCollectionActions} from "../../core/reducers/menu-item-collection.reducer";
import {ARTICLE_COLLECTION_PIPE, ArticleCollectionActions} from "../../core/reducers/article-collection.reducer";
import {ApiEndpointEnum, ApiService} from "../../core/services/api.service";
import {MzToastService} from "ngx-materialize";
import {MenuItem} from "../../shared/models/menu-item";
import {DeleteModalComponent} from "../../shared/components/modal/delete-modal/delete-modal.component";

const TABLE_HEAD: TableColumn[] = [
  {title: 'Title', name: 'title'},
  {title: 'Article', name: 'article_id'},
];

const TABLE_ACTIONS: TableAction[] = [
  {name: 'Edit', id: 'openEditModal'},
  {name: 'Delete', id: 'openDeleteModal', warning: true},
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('modalEdit')
  modalEdit: MenuEditModalComponent;
  @ViewChild('modalDelete')
  modalDelete: DeleteModalComponent;
  $tableData: Observable<Table>;
  $articles: Observable<Article[]>;

  constructor(private store: Store<AppState>,
              private api: ApiService,
              private toastService: MzToastService) { }

  ngOnInit() {
    this.$tableData = this.store.pipe(
      select(MENU_ITEM_COLLECTION_PIPE),
      switchMap((items: Article[]) => {
        return of({
          head: TABLE_HEAD,
          data: items ? items.map(item => ({...item} as TableRow)) : [],
          actions: TABLE_ACTIONS,
        });
      }),
    );
    this.store.dispatch({type: MenuItemCollectionActions.GET_REQUEST});
    this.$articles = this.store.pipe(
      select(ARTICLE_COLLECTION_PIPE),
    );
    this.store.dispatch({type: ArticleCollectionActions.GET_REQUEST});
  }

  sort([oldIndex, newIndex]: [number, number]): void {
    this.$tableData.pipe(take(1)).subscribe(tableData => {
      const tempData = tableData.data.filter((_, index) => index !== oldIndex);
      const removedData = tempData.splice(0, newIndex, tableData.data[oldIndex]);
      const preparedData = [...removedData, ...tempData]
        .map((item, index) => ({id: item.id, order: index}));
      this.updateOrder(preparedData);
    });
  }

  updateOrder(data: {id: number, order: string | number}[]): void {
    this.api.post('menu-items/order', data).subscribe(() => {
        this.store.dispatch({type: MenuItemCollectionActions.GET_REQUEST});
        this.toastService.show(`Order was updated`, 1000, 'green');
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  openEditModal(id?: number): void {
    this.modalEdit.openModal(id)
  }

  submit(menuItem: MenuItem): void {
    if (menuItem.id) {
      this.edit(menuItem);
    } else {
      this.$tableData.pipe(take(1)).subscribe(tableData => this.create({...menuItem, order: tableData.data.length}));
    }
  }

  private edit(menuItem: MenuItem): void {
    this.api.put(ApiEndpointEnum.menuItems, menuItem.id, menuItem).subscribe(() => {
        this.store.dispatch({type: MenuItemCollectionActions.GET_REQUEST});
        this.toastService.show(`Menu item ${menuItem.title} was edited successful`, 4000, 'green');
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  private create(menuItem: MenuItem): void {
    this.api.post(ApiEndpointEnum.menuItems, menuItem).subscribe(() => {
        this.store.dispatch({type: MenuItemCollectionActions.GET_REQUEST});
        this.toastService.show(`Menu item ${menuItem.title} was created successful`, 4000, 'green');
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  tableAction(action: TableAction): void {
    this[action.id](action.row.id);
  }

  openDeleteModal(id: number): void {
    this.modalDelete.openModal(id);
  }

  delete(id: number): void {
    this.api.delete(ApiEndpointEnum.menuItems, id).subscribe(() => {
      this.store.dispatch({type: MenuItemCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

}
