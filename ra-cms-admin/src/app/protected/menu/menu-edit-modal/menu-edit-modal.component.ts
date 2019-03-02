import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {ModalAction} from "../../../shared/components/modal/modal-action";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Article} from "../../../shared/models/article";
import {MenuItem} from "../../../shared/models/menu-item";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {AppState} from "../../../shared/models/app-state";
import {MENU_ITEM_PIPE, MenuItemActions} from "../../../core/reducers/menu-item.reducer";

const CREATE_BUTTON_INDEX = 1;

@Component({
  selector: 'app-menu-edit-modal',
  templateUrl: './menu-edit-modal.component.html',
  styleUrls: ['./menu-edit-modal.component.scss']
})
export class MenuEditModalComponent implements OnInit, OnDestroy {

  @Input()
  articles: Article[];

  @Output()
  create: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @ViewChild('modal')
  modal: ModalComponent;

  private readonly actions: ModalAction[] = [
    {name: 'Close'},
    {name: 'Create', id: 'create', disabled: true},
  ];

  $menuItemSubscription: Subscription;
  form: FormGroup;
  isEdit = false;
  menuItem: MenuItem;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      article_id: [null, Validators.required],
    });
    this.form.statusChanges.subscribe(data => this.actions[CREATE_BUTTON_INDEX].disabled = data !== 'VALID');
    this.$menuItemSubscription = this.store.pipe(
      select(MENU_ITEM_PIPE),
    ).subscribe(data => {
      if (this.isEdit) {
        this.menuItem = data;
        this.form.patchValue(data);
      }
    });
  }

  modalAction(action: ModalAction): void {
    if (action.id === 'create') {
      this.create.emit({...this.menuItem, ...this.form.value});
    }
  }

  openModal(id?: number): void {
    this.isEdit = !!id;
    this.menuItem = null;
    this.actions[CREATE_BUTTON_INDEX].name = this.isEdit ? 'Edit' : 'Create';
    this.form.reset();
    if (id) {
      this.store.dispatch({type: MenuItemActions.GET_REQUEST, payload: id});
    }
    this.modal.openModal();
  }

  ngOnDestroy(): void {
    this.$menuItemSubscription.unsubscribe();
  }

}
