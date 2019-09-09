import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AppState} from '../../shared/models/app-state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {FILE_COLLECTION_PIPE, FileCollectionActions} from '../../core/reducers/file-collection.reducer';
import {Table} from '../../shared/components/table/table';
import {of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {API_ENDPOINT, ApiEndpointEnum, ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {TableRow} from '../../shared/components/table/table-row';
import {File} from '../../shared/models/file';
import {MzToastService} from 'ngx-materialize';
import {DeleteModalComponent} from '../../shared/components/modal/delete-modal/delete-modal.component';
import {TableAction} from '../../shared/components/table/table-action';
import {ClipboardService} from 'ngx-clipboard';

const TABLE_HEAD = [
  {title: '', name: 'image'},
  {title: 'Name', name: 'name'},
];

const TABLE_ACTIONS = [
  {name: 'Copy url', id: 'copyUrl'},
  {name: 'Open/Download', id: 'visitLink'},
  {name: 'Delete', id: 'openDeleteModal', warning: true},
];

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnDestroy {

  @Input('isInModal') isInModal = false;
  @ViewChild('modal')
  modal: DeleteModalComponent;
  @Output('pick') pick = new EventEmitter<string>();
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
    onprocessfile: () => this.store.dispatch({type: FileCollectionActions.GET_REQUEST})
  };

  constructor(private store: Store<AppState>,
              private auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private api: ApiService,
              private toastService: MzToastService,
              private clipboardService: ClipboardService) {
  }

  ngOnInit() {
    this.$subscription = this.store.pipe(
      select(FILE_COLLECTION_PIPE),
      switchMap((items: File[]) => {
        return of({
          head: TABLE_HEAD,
          data: items ? items.map(item => ({...item, image: {url: item.url}} as TableRow)) : [],
          actions: TABLE_ACTIONS,
        });
      })).subscribe(data => {
        this.$tableData = of(data);
        this.changeDetector.detectChanges(); // fix that zonejs does not detect changes from FilePond
    });
    this.store.dispatch({type: FileCollectionActions.GET_REQUEST});
  }

  tableAction(action: TableAction): void {
    this[action.id](action.row);
  }

  clickRow(row: TableRow): void {
    this.pick.emit(String(row.url));
  }

  delete(id: number): void {
    this.api.delete(ApiEndpointEnum.files, id).subscribe(() => {
      this.store.dispatch({type: FileCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

  openDeleteModal(row: TableRow): void {
    this.modal.openModal(row.id);
  }

  copyUrl(row: TableRow): void {
    this.clipboardService.copyFromContent(String(row.url));
    this.toastService.show(`${String(row.url)} copied to clipboard`, 4000, 'blue');
  }

  visitLink(row: TableRow): void {
    window.open(String(row.url), '_blank');
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

}
