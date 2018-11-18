import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MzButtonModule,
  MzCardModule, MzChipModule, MzDropdownModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule, MzModalModule,
  MzNavbarModule, MzProgressModule, MzTextareaModule,
  MzToastModule
} from 'ngx-materialize';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FilePondModule } from 'ngx-filepond';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import {DeleteModalComponent} from './components/modal/delete-modal/delete-modal.component';
import {ColorDirective} from './directives/color.directive';
import {JoditAngularModule} from "jodit-angular";

@NgModule({
  imports: [
    CommonModule,

    MzButtonModule,
    MzDropdownModule,
    MzModalModule,
    MzIconModule,
    MzIconMdiModule,
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MzNavbarModule,
    MzCardModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzButtonModule,
    MzToastModule,
    MzNavbarModule,
    MzDropdownModule,
    MzModalModule,
    MzTextareaModule,
    MzChipModule,
    MzProgressModule,
    FilePondModule,

    TableComponent,
    ModalComponent,
    DeleteModalComponent,
    ColorDirective,
    JoditAngularModule,
  ],
  declarations: [
    TableComponent,
    ModalComponent,
    DeleteModalComponent,
    ColorDirective,
  ],
})
export class SharedModule {
}
