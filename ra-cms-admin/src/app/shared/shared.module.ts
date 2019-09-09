import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MzButtonModule,
  MzCardModule, MzChipModule, MzDropdownModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule, MzModalModule,
  MzNavbarModule, MzProgressModule, MzSelectModule, MzSidenavModule, MzTextareaModule,
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
import {SortablejsModule} from "angular-sortablejs";
import { DefaultImageDirective } from './directives/default-image.directive';
import {ClipboardModule} from "ngx-clipboard";

@NgModule({
  imports: [
    CommonModule,

    MzButtonModule,
    MzDropdownModule,
    MzModalModule,
    MzIconModule,
    MzIconMdiModule,
    SortablejsModule,
    ClipboardModule,
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
    MzSelectModule,
    MzSidenavModule,
    FilePondModule,
    JoditAngularModule,
    SortablejsModule,
    ClipboardModule,

    TableComponent,
    ModalComponent,
    DeleteModalComponent,
    ColorDirective,
    DefaultImageDirective,
  ],
  declarations: [
    TableComponent,
    ModalComponent,
    DeleteModalComponent,
    ColorDirective,
    DefaultImageDirective,
  ],
})
export class SharedModule {
}
