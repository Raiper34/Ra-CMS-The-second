import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {ModalAction} from "../../../shared/components/modal/modal-action";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/app-state";
import {Category} from "../../../shared/models/category";
import {MenuItem} from "../../../shared/models/menu-item";
import {CATEGORY_PIPE, CategoryActions} from "../../../core/reducers/category.reducer";

const CREATE_BUTTON_INDEX = 1;

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.scss']
})
export class CategoryEditModalComponent implements OnInit, OnDestroy {

  @Output() create: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  @ViewChild('modal') modal: ModalComponent;

  private readonly actions: ModalAction[] = [
    {name: 'Close'},
    {name: 'Create', id: 'create', disabled: true},
  ];

  $categorySubscription: Subscription;
  form: FormGroup;
  isEdit = false;
  category: Category;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [null, Validators.required],
    });
    this.form.statusChanges.subscribe(data => this.actions[CREATE_BUTTON_INDEX].disabled = data !== 'VALID');
    this.$categorySubscription = this.store.pipe(
      select(CATEGORY_PIPE),
    ).subscribe(data => {
      if (this.isEdit) {
        this.category = data;
        this.form.patchValue(data);
      }
    });
  }

  modalAction(action: ModalAction): void {
    if (action.id === 'create') {
      this.create.emit({...this.category, ...this.form.value});
    }
  }

  openModal(id?: number): void {
    this.isEdit = !!id;
    this.category = null;
    this.actions[CREATE_BUTTON_INDEX].name = this.isEdit ? 'Edit' : 'Create';
    this.form.reset();
    if (id) {
      this.store.dispatch({type: CategoryActions.GET_REQUEST, payload: id});
    }
    this.modal.openModal();
  }

  ngOnDestroy(): void {
    this.$categorySubscription.unsubscribe();
  }

}
