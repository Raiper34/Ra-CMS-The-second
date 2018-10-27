import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalAction} from '../modal-action';
import {ModalComponent} from '../modal.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('modal')
  modal: ModalComponent;

  private readonly actions: ModalAction[] = [
    {name: 'Close'},
    {name: 'Delete', warning: true}
    ];

  private id: number;

  constructor() { }

  ngOnInit() {
  }

  modalAction(action: ModalAction): void {
    if (action.name === 'Delete') {
      this.delete.emit(this.id);
    }
  }

  openModal(id: number): void {
    this.id = id;
    this.modal.openModal();
  }

}
