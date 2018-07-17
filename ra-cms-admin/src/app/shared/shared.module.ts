import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzButtonModule, MzCardModule, MzIconModule, MzInputModule, MzToastModule} from 'ngx-materialize';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MzCardModule,
  ],
  exports: [
    MzCardModule,
    MzInputModule,
    MzIconModule,
    MzButtonModule,
    MzToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class SharedModule { }
