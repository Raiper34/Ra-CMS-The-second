import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../shared/models/app-state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {fileCollectionActions} from '../../core/reducers/file-collection.reducer';
import {Table} from '../../shared/components/table/table';
import {of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {API_ENDPOINT, ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {TableRow} from '../../shared/components/table/table-row';
import {File} from '../../shared/models/file';
import {MzToastService} from 'ngx-materialize';
import {DeleteModalComponent} from '../../shared/components/modal/delete-modal/delete-modal.component';
import {TableAction} from '../../shared/components/table/table-action';

const TABLE_HEAD = [
  {title: 'Name', name: 'name'},
  {title: 'Created', name: 'created_at'},
  {title: 'Updated', name: 'updated_at'}
];

const TABLE_ACTIONS = [
  {name: 'Delete', id: 'delete', warning: true},
];

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnDestroy {

  @ViewChild('modal')
  modal: DeleteModalComponent;
  $tableData: Observable<Table>;
  $subscription: Subscription;

  pondOptions = {
    server: {
      process: {
        url: `${API_ENDPOINT}/files`,
        headers: {
          Accept: 'application/json',
          Authorization: this.auth.getToken()
        },
      },
    },
    allowRevert: false,
    allowMultiple: true,
    onprocessfile: () => this.store.dispatch({type: fileCollectionActions.GET_REQUEST})
  };

  constructor(private store: Store<AppState>,
              private auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private api: ApiService,
              private toastService: MzToastService) {
  }

  ngOnInit() {
    this.$subscription = this.store.pipe(
      select('fileCollection'),
      switchMap((items: File[]) => {
        return of({
          head: TABLE_HEAD,
          data: items ? items.map(item => ({...item} as TableRow)) : [],
          actions: TABLE_ACTIONS,
        });
      })).subscribe(data => {
        this.$tableData = of(data);
        this.changeDetector.detectChanges(); // fix that zonejs does not detect changes from FilePond
    });
    this.store.dispatch({type: fileCollectionActions.GET_REQUEST});
  }

  tableAction(action: TableAction): void {
    this[action.id](action.row.id);
  }

  delete(id: number): void {
    this.api.delete('files', id).subscribe(() => {
      this.store.dispatch({type: fileCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

}
