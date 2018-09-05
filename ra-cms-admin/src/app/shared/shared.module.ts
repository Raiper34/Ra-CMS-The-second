import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzButtonModule, MzCardModule, MzIconModule, MzInputModule, MzNavbarModule, MzToastModule} from 'ngx-materialize';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    MzNavbarModule,
    MzCardModule,
    MzInputModule,
    MzIconModule,
    MzButtonModule,
    MzToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MzNavbarModule,
    EditorModule,
  ],
  declarations: [],
})
export class SharedModule { }
