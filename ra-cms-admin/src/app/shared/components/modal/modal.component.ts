import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import ModalOptions = Materialize.ModalOptions;
import {ModalAction} from './modal-action';
import {MzModalComponent} from 'ngx-materialize';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() buttonText: string;
  @Input() fixedFooter: boolean;
  @Input() bottomSheet: boolean;
  @Input() fullscreen: boolean;
  @Input() options: ModalOptions;
  @Input() modalActions: ModalAction[];

  @Output()
  action: EventEmitter<ModalAction> = new EventEmitter<ModalAction>();

  @ViewChild('modal')
  modal: MzModalComponent;

  constructor() { }

  ngOnInit() {
  }

  onAction(action: ModalAction) {
   this.action.emit(action);
  }

  openModal(): void {
    this.modal.openModal();
  }

}
