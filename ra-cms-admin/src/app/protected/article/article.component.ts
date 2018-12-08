import {Component, OnInit, ViewChild} from '@angular/core';
import {articleCollectionActions} from '../../core/reducers/article-collection.reducer';
import {TableAction} from '../../shared/components/table/table-action';
import {TableColumn} from '../../shared/components/table/table-column';
import {switchMap} from 'rxjs/operators';
import {Article} from '../../shared/models/article';
import {Router} from '@angular/router';
import {ApiService} from '../../core/services/api.service';
import {TableRow} from '../../shared/components/table/table-row';
import {of} from 'rxjs';
import {MzToastService} from 'ngx-materialize';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../shared/models/app-state';
import {DeleteModalComponent} from '../../shared/components/modal/delete-modal/delete-modal.component';
import {Observable} from 'rxjs/internal/Observable';
import {Table} from '../../shared/components/table/table';
import { environment } from '../../../environments/environment';

const PREVIEW_URL = 'api/articles/preview';

const TABLE_HEAD: TableColumn[] = [
  {title: 'Title', name: 'title'},
  {title: 'Created', name: 'created_at'},
  {title: 'Updated', name: 'updated_at'}
];

const TABLE_ACTIONS: TableAction[] = [
  {name: 'Preview', id: 'preview'},
  {name: 'Edit', id: 'edit'},
  {name: 'Delete', id: 'openDeleteModal', warning: true},
];

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @ViewChild('modal')
  modal: DeleteModalComponent;
  $tableData: Observable<Table>;

  constructor(private store: Store<AppState>,
              private api: ApiService,
              private toastService: MzToastService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.$tableData = this.store.pipe(
      select('articleCollection'),
      switchMap((items: Article[]) => {
        return of({
          head: TABLE_HEAD,
          data: items ? items.map(item => ({...item} as TableRow)) : [],
          actions: TABLE_ACTIONS,
        });
      }),
    );
    this.store.dispatch({type: articleCollectionActions.GET_REQUEST});
  }

  tableAction(action: TableAction): void {
    this[action.id](action.row.id);
  }

  edit(id: number): void {
    this.router.navigate(['/protected/article/edit', id]);
  }

  delete(id: number): void {
    this.api.delete('articles', id).subscribe(() => {
      this.store.dispatch({type: articleCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

  openDeleteModal(id: number): void {
    this.modal.openModal(id);
  }

  preview(id: number): void {
    window.open(`${environment.publicUrl}/${PREVIEW_URL}/${id}`, "_blank");
  }
}
