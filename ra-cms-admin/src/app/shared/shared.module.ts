import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MzButtonModule,
  MzCardModule, MzDropdownModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzNavbarModule,
  MzToastModule
} from 'ngx-materialize';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MzNavbarModule,
    MzCardModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzButtonModule,
    MzToastModule,
    MzNavbarModule,
    MzDropdownModule,

    EditorModule,
  ],
  declarations: [],
})
export class SharedModule {
}
